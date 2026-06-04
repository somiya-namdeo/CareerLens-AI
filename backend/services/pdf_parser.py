import fitz  # PyMuPDF
import logging

logger = logging.getLogger(__name__)

def extract_text(pdf_path: str) -> str:
    """
    Extracts text from a given PDF file using PyMuPDF.
    If the extracted text is < 50 characters, it falls back to OCR via pytesseract.
    """
    text = ""
    doc = None
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text += page.get_text()
            
        text = text.strip()
        
        # Fallback to OCR if less than 50 characters
        if len(text) < 50:
            logger.info(f"Text length ({len(text)}) < 50 chars. OCR fallback started.")
            try:
                from PIL import Image
                import pytesseract
                import io
                
                # Use absolute path to bypass Windows PATH issues
                pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
                
                ocr_text = ""
                num_pages = len(doc)
                logger.info(f"Processing {num_pages} pages for OCR.")
                
                # Render each page to an image and run OCR
                for page in doc:
                    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
                    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                    ocr_text += pytesseract.image_to_string(img)
                    
                text = ocr_text.strip()
                logger.info(f"OCR text length extracted: {len(text)} chars.")
                
            except ImportError as ie:
                logger.error(f"OCR libraries missing (pytesseract/Pillow). Please install them. {ie}")
            except FileNotFoundError as fne:
                logger.error(f"Tesseract is not installed locally on the system. OCR failed: {fne}")
            except Exception as e:
                logger.error(f"OCR extraction failed: {e}")
                
    except Exception as e:
        logger.error(f"Error parsing PDF with PyMuPDF: {e}")
    finally:
        if doc:
            doc.close()
            
    return text
