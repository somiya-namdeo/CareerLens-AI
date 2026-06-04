
# CELL
#Mount Google drive
from google.colab import drive
drive.mount('/content/drive')

# CELL
import os

print(os.listdir('/content/drive/MyDrive'))

# CELL
!unzip "/content/drive/MyDrive/workforce_project.zip" -d "/content/"

# CELL
# Data Handling
import pandas as pd
import numpy as np

# Visualization
import matplotlib.pyplot as plt
%matplotlib inline
import seaborn as sns

# Preprocessing
from sklearn.preprocessing import LabelEncoder

# Train Test Split
from sklearn.model_selection import train_test_split

# Machine Learning Models
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB
from xgboost import XGBClassifier
from sklearn.neighbors import KNeighborsClassifier

# Evaluation Metrics
from sklearn.metrics import (accuracy_score,precision_score,recall_score,f1_score,confusion_matrix,classification_report)

# Model Saving
import joblib

# Ignore Warnings
import warnings
warnings.filterwarnings('ignore')

# CELL
!apt-get install -y poppler-utils tesseract-ocr
!pip install pytesseract pdf2image

# CELL
#CHECK FILE PATHS
import os

for root, dirs, files in os.walk('/content/workforce_project'):
    for file in files:
        if file.endswith('.csv') or file.endswith('.xlsx'):
            print(os.path.join(root, file))

# CELL
import os

resume_path = "/content/workforce_project/resume_dataset/Resumes PDF"

for folder in os.listdir(resume_path):

    folder_path = os.path.join(resume_path, folder)

    if os.path.isdir(folder_path):

        pdf_count = len([
            f for f in os.listdir(folder_path)
            if f.lower().endswith(".pdf")
        ])

        print(folder, ":", pdf_count)

# CELL
import os

resume_path = "/content/workforce_project/resume_dataset/Resumes PDF"

sample_pdf = None

for folder in os.listdir(resume_path):

    folder_path = os.path.join(resume_path, folder)

    if os.path.isdir(folder_path):

        for file in os.listdir(folder_path):

            if file.lower().endswith(".pdf"):

                sample_pdf = os.path.join(folder_path, file)

                print("Sample PDF:")
                print(sample_pdf)

                break

        if sample_pdf:
            break

# CELL
import pytesseract
from pdf2image import convert_from_path

images = convert_from_path(
    sample_pdf,
    first_page=1,
    last_page=1
)

text = pytesseract.image_to_string(images[0])

print("Text Length:", len(text))
print(text[:2000])

# CELL
resume_ocr_df['resume_text'].str.len().describe()

# CELL
save_path = "/content/drive/MyDrive/Workforce_Project/resume_ocr_dataset.csv"

resume_ocr_df = pd.read_csv(save_path)
ocr_data = resume_ocr_df.values.tolist()

done_files = set(
    resume_ocr_df["role"] + "/" + resume_ocr_df["filename"]
)

limit_per_class = 50

for role in os.listdir(resume_path):
    role_path = os.path.join(resume_path, role)

    if os.path.isdir(role_path):
        current_count = len(resume_ocr_df[resume_ocr_df["role"] == role])

        print("\nStarting:", role, "| Already:", current_count)

        for file in os.listdir(role_path):
            if current_count >= limit_per_class:
                break

            unique_id = role + "/" + file

            if file.lower().endswith(".pdf") and unique_id not in done_files:
                print("Processing:", unique_id)

                pdf_path = os.path.join(role_path, file)

                try:
                    images = convert_from_path(
                        pdf_path,
                        first_page=1,
                        last_page=1,
                        dpi=100
                    )

                    text = pytesseract.image_to_string(
                        images[0],
                        config="--psm 6"
                    )

                    if len(text.strip()) > 100:
                        ocr_data.append([text, role, file])
                        done_files.add(unique_id)
                        current_count += 1

                        resume_ocr_df = pd.DataFrame(
                            ocr_data,
                            columns=["resume_text", "role", "filename"]
                        )

                        resume_ocr_df.to_csv(save_path, index=False)

                        print("Saved:", role, current_count)

                except Exception as e:
                    print("Error:", unique_id, e)

        print(role, "done:", current_count)

print("Final:", resume_ocr_df.shape)

# CELL
resume_ocr_df['role'].value_counts()

resume_ocr_df.head(10)

# CELL
print(resume_ocr_df.iloc[0]['resume_text'][:1000])

# CELL
resume_ocr_df.to_csv("/content/drive/MyDrive/Workforce_Project/resume_ocr_dataset.csv",index=False)

print("Saved successfully")

# CELL
print(resume_ocr_df.isnull().sum())

print("Duplicates:", resume_ocr_df.duplicated().sum())

print(resume_ocr_df['role'].value_counts())

# CELL
X = resume_ocr_df['resume_text']
y = resume_ocr_df['role']

# CELL
from sklearn.feature_extraction.text import TfidfVectorizer

tfidf = TfidfVectorizer(
    max_features=5000,
    stop_words='english'
)

X = resume_ocr_df['resume_text']
y = resume_ocr_df['role']

X_tfidf = tfidf.fit_transform(X)

print(X_tfidf.shape)

# CELL
X_train, X_test, y_train, y_test = train_test_split(X_tfidf,y,test_size=0.2,random_state=42,stratify=y)

print(X_train.shape)
print(X_test.shape)

# CELL
#Logistic Regression
lr = LogisticRegression(max_iter=3000)

lr.fit(X_train, y_train)

pred_lr = lr.predict(X_test)

print("LR Accuracy:", accuracy_score(y_test, pred_lr))

# CELL
#Naive Bayes
nb = MultinomialNB()

nb.fit(X_train, y_train)

pred_nb = nb.predict(X_test)

print("NB Accuracy:", accuracy_score(y_test, pred_nb))

# CELL
#Random Forest
rf = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

rf.fit(X_train, y_train)

pred_rf = rf.predict(X_test)

print("RF Accuracy:", accuracy_score(y_test, pred_rf))

# CELL
#SVM
svm = LinearSVC()

svm.fit(X_train, y_train)

pred_svm = svm.predict(X_test)

print("SVM Accuracy:", accuracy_score(y_test, pred_svm))

# CELL
#KNN
knn = KNeighborsClassifier(n_neighbors=5)

knn.fit(X_train, y_train)

pred_knn = knn.predict(X_test)

print("KNN Accuracy:", accuracy_score(y_test, pred_knn))

# CELL
from sklearn.metrics import classification_report

print("Random Forest Report")
print(classification_report(y_test, y_pred_rf))

print("\nLogistic Regression Report")
print(classification_report(y_test, y_pred_lr))

# CELL
cm = confusion_matrix(y_test, pred_svm)

plt.figure(figsize=(12,8))
sns.heatmap(cm, annot=True, fmt='d')
plt.title("OCR Resume Classification")
plt.show()

# CELL
import joblib

joblib.dump(svm, "ocr_role_model.pkl")
joblib.dump(tfidf, "ocr_tfidf.pkl")

# CELL
joblib.dump(lr, "ocr_lr_model.pkl")

# CELL
joblib.dump(
    svm,
    "/content/drive/MyDrive/Workforce_Project/ocr_role_model.pkl"
)

joblib.dump(
    tfidf,
    "/content/drive/MyDrive/Workforce_Project/ocr_tfidf.pkl"
)

# CELL
resume_ocr_df.to_csv(
    "/content/drive/MyDrive/Workforce_Project/resume_ocr_dataset_240.csv",
    index=False
)

# CELL
import joblib

joblib.dump(
    lr,
    "/content/drive/MyDrive/Workforce_Project/ocr_lr_240.pkl"
)

# CELL
y_pred_rf = rf.predict(X_test)
y_pred_lr = lr.predict(X_test)

# CELL
import joblib

joblib.dump(
    rf,
    "/content/drive/MyDrive/Workforce_Project/ocr_rf_final.pkl"
)

joblib.dump(
    tfidf,
    "/content/drive/MyDrive/Workforce_Project/ocr_tfidf_final.pkl"
)

# CELL
joblib.dump(
    lr,
    "/content/drive/MyDrive/Workforce_Project/ocr_lr_backup.pkl"
)

# CELL
import os

os.listdir("/content/drive/MyDrive/Workforce_Project")

# CELL
import shutil

shutil.copy(
    "/content/drive/MyDrive/Workforce_Project/ocr_role_model.pkl",
    "/content/drive/MyDrive/Workforce_Project/models/ocr_role_model.pkl"
)

shutil.copy(
    "/content/drive/MyDrive/Workforce_Project/ocr_tfidf.pkl",
    "/content/drive/MyDrive/Workforce_Project/models/ocr_tfidf.pkl"
)