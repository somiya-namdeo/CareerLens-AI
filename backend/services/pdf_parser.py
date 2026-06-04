import fitz  # PyMuPDF
import logging

logger = logging.getLogger(__name__)

def extract_text(pdf_path: str) -> dict:
    """
    Extracts text from a given PDF file using PyMuPDF.
    If the extracted text is < 30 characters, it falls back to OCR via pytesseract.
    Returns a dictionary with extraction metadata.
    """
    text = ""
    doc = None
    num_pages = 0
    extraction_method = "failed"
    
    try:
        doc = fitz.open(pdf_path)
        num_pages = len(doc)
        for page in doc:
            text += page.get_text("text") + "\n"
            
        text = text.strip()
        
        # Fallback to OCR if less than 30 characters
        if len(text) > 30:
            extraction_method = "pymupdf"
        else:
            logger.info(f"Text length ({len(text)}) <= 30 chars. OCR fallback started.")
            try:
                from PIL import Image
                import pytesseract
                import os
                
                # Windows fallback path
                if os.name == 'nt':
                    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
                
                ocr_text = ""
                logger.info(f"Processing {num_pages} pages for OCR.")
                
                # Render each page to an image and run OCR
                for page in doc:
                    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
                    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                    ocr_text += pytesseract.image_to_string(img) + "\n"
                    
                if len(ocr_text.strip()) > 30:
                    text = ocr_text.strip()
                    extraction_method = "ocr"
                    logger.info(f"OCR text length extracted: {len(text)} chars.")
                elif len(text) > 0:
                    extraction_method = "pymupdf"
                
            except ImportError as ie:
                logger.error(f"OCR libraries missing (pytesseract/Pillow). Please install them. {ie}")
                if len(text) > 0: extraction_method = "pymupdf"
            except FileNotFoundError as fne:
                logger.error(f"Tesseract is not installed locally on the system. OCR failed: {fne}")
                if len(text) > 0: extraction_method = "pymupdf"
            except Exception as e:
                logger.error(f"OCR extraction failed: {e}")
                if len(text) > 0: extraction_method = "pymupdf"
                
    except Exception as e:
        logger.error(f"Error parsing PDF with PyMuPDF: {e}")
    finally:
        if doc:
            doc.close()
            
    return {
        "extracted_text": text,
        "page_count": num_pages,
        "word_count": len(text.split()),
        "character_count": len(text),
        "extraction_method": extraction_method
    }
