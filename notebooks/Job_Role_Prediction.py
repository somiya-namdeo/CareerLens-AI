
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

from xgboost import XGBClassifier

# Evaluation Metrics
from sklearn.metrics import (accuracy_score,precision_score,recall_score,f1_score,confusion_matrix,classification_report)

# Model Saving
import joblib

# Ignore Warnings
import warnings
warnings.filterwarnings('ignore')

# CELL
# Install required libraries
!pip install xgboost -q

# CELL
#CHECK FILE PATHS
import os

for root, dirs, files in os.walk('/content/workforce_project'):
    for file in files:
        if file.endswith('.csv') or file.endswith('.xlsx'):
            print(os.path.join(root, file))

# CELL
#LOAD THE DATASET
df = pd.read_csv("/content/workforce_project/resume_screening_main/AI_Resume_Screening.csv")

# CELL
print(df.shape)
print(df.columns.tolist())
df.head()

# CELL
y = df['Job Role']

# CELL
all_skills = []

for skills in df['Skills']:
    all_skills.extend(skills.split(','))

all_skills = [s.strip() for s in all_skills]

pd.Series(all_skills).value_counts()

# CELL
X_skills = tfidf.fit_transform(df['Skills_Clean'])

# CELL
X_train, X_test, y_train, y_test = train_test_split(X_skills,y,test_size=0.2,random_state=42)

# CELL
#Logistic Regression
lr = LogisticRegression(max_iter=1000)

lr.fit(X_train, y_train)

pred_lr = lr.predict(X_test)

print("Accuracy:",accuracy_score(y_test, pred_lr))

# CELL
# Random Forest
rf = RandomForestClassifier(n_estimators=200,random_state=42)

rf.fit(X_train, y_train)

pred_rf = rf.predict(X_test)

print( "RF Accuracy:", accuracy_score(y_test, pred_rf))

# CELL
#Naive Bayes
nb = MultinomialNB()

nb.fit(X_train, y_train)

y_pred_nb = nb.predict(X_test)

print(
    "Naive Bayes Accuracy:",
    accuracy_score(y_test, y_pred_nb)
)

# CELL
#SVM
svm = LinearSVC()

svm.fit(X_train, y_train)

y_pred_svm = svm.predict(X_test)

print(
    "SVM Accuracy:",
    accuracy_score(y_test, y_pred_svm)
)

# CELL
#KNN
knn = KNeighborsClassifier(n_neighbors=5)

knn.fit(X_train, y_train)

y_pred_knn = knn.predict(X_test)

print(
    "KNN Accuracy:",
    accuracy_score(y_test, y_pred_knn)
)

# CELL
y_pred_lr = lr.predict(X_test)
y_pred_rf = rf.predict(X_test)
y_pred_nb = nb.predict(X_test)
y_pred_svm = svm.predict(X_test)
y_pred_knn = knn.predict(X_test)

print("Logistic Regression :", accuracy_score(y_test, y_pred_lr))
print("Random Forest       :", accuracy_score(y_test, y_pred_rf))
print("Naive Bayes         :", accuracy_score(y_test, y_pred_nb))
print("SVM                 :", accuracy_score(y_test, y_pred_svm))
print("KNN                 :", accuracy_score(y_test, y_pred_knn))

# CELL
# Confusion matrix
cm = confusion_matrix(y_test, pred_lr)

plt.figure(figsize=(6,5))

sns.heatmap(cm,annot=True,fmt='d',cmap='Blues')

plt.title("Job Role Prediction")
plt.xlabel("Predicted")
plt.ylabel("Actual")

plt.show()

# CELL
print("Train Accuracy:",accuracy_score(y_train,lr.predict(X_train)))

print("Test Accuracy:",accuracy_score(y_test,lr.predict(X_test)))

# CELL
print("RF Train Accuracy:",accuracy_score(y_train,rf.predict(X_train)))

print("RF Test Accuracy:",accuracy_score(y_test,rf.predict(X_test)))

# CELL
import joblib

joblib.dump(
    lr,
    "/content/drive/MyDrive/Workforce_Project/models/job_role_model.pkl"
)

joblib.dump(
    tfidf,
    "/content/drive/MyDrive/Workforce_Project/models/job_role_tfidf.pkl"
)

print("Job Role model and TF-IDF saved")