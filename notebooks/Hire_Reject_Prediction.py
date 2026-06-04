
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

print(df.shape)
print(df.columns.tolist())
df.head()

# CELL
df.info()

# CELL
df.isnull().sum()

# CELL
df.duplicated().sum()

# CELL
df.describe()

# CELL
df['Recruiter Decision'].value_counts()

# CELL
df['Recruiter Decision'].value_counts().plot(kind='bar')

# CELL
df['Job Role'].value_counts()

# CELL
df['Job Role'].value_counts().plot(kind='bar')

# CELL
df['Education'].value_counts()

# CELL
plt.hist(df['Experience (Years)'])

# CELL
print("Mean:", df['Experience (Years)'].mean())
print("Median:", df['Experience (Years)'].median())
print("Mode:", df['Experience (Years)'].mode()[0])
print("Min:", df['Experience (Years)'].min())
print("Max:", df['Experience (Years)'].max())

# CELL
plt.hist(df['AI Score (0-100)'])

# CELL
plt.hist(df['Projects Count'])

# CELL
plt.figure(figsize=(8,5))

sns.boxplot(x='Recruiter Decision',y='Experience (Years)', data=df)

# CELL
plt.figure(figsize=(8,5))

sns.boxplot(x='Recruiter Decision',y='AI Score (0-100)',data=df)

# CELL
plt.figure(figsize=(8,5))

sns.boxplot(x='Recruiter Decision',y='Projects Count',data=df)

# CELL
plt.figure(figsize=(8,5))

sns.scatterplot(x='Experience (Years)',y='Salary Expectation ($)',data=df)

# CELL
plt.figure(figsize=(8,5))

sns.scatterplot(x='AI Score (0-100)',y='Salary Expectation ($)',data=df)


# CELL
plt.figure(figsize=(8,6))

sns.heatmap(df.select_dtypes(include='number').corr(),annot=True,cmap='coolwarm')


# CELL
df['Skills'].head(10)

# CELL
df['Certifications'].value_counts().head(20)

# CELL
df['Job Role'].value_counts()

# CELL
df['Education'].nunique()

# CELL
df['Job Role'].nunique()

# CELL
df['Recruiter Decision'].nunique()

# CELL
pd.crosstab(df['Education'],df['Recruiter Decision'])

# CELL
pd.crosstab(df['Certifications'],df['Recruiter Decision'])

# CELL
df = df.drop("Resume_ID", axis=1)

# CELL
all_skills = []

for skills in df['Skills']:
    all_skills.extend(skills.split(','))

all_skills = [s.strip() for s in all_skills]

pd.Series(all_skills).value_counts()

# CELL
pd.Series(all_skills).value_counts().plot(kind='bar', figsize=(10,5))

# CELL
df['Skill_Count'] = df['Skills'].apply(lambda x: len(x.split(',')))

# CELL
df['Has_Certification'] = (df['Certifications'].notnull().astype(int))

# CELL
def exp_level(x):
    if x <= 2:
        return 'Junior'
    elif x <= 5:
        return 'Mid'
    else:
        return 'Senior'

df['Experience_Level'] = (df['Experience (Years)'].apply(exp_level))

# CELL
df['High_AI_Score'] = (df['AI Score (0-100)'] >= 80).astype(int)

# CELL
df['High_Projects'] = (df['Projects Count'] >= 5).astype(int)

# CELL
df.head()

# CELL
df['Skills_Clean'] = df['Skills']

# CELL
df['Skills_Clean'] = (df['Skills_Clean'].str.replace('Deep Learning', 'DeepLearning').str.replace('Machine Learning', 'MachineLearning').str.replace('Ethical Hacking', 'EthicalHacking'))

# CELL
df['Recruiter Decision'] = df['Recruiter Decision'].map({
    'Hire':1,
    'Reject':0
})

# CELL
from sklearn.feature_extraction.text import TfidfVectorizer

tfidf = TfidfVectorizer()

X_skills = tfidf.fit_transform(df['Skills_Clean'])

print(tfidf.get_feature_names_out())

# CELL
from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()

df['Education'] = le.fit_transform(df['Education'])

# CELL
le_exp = LabelEncoder()

df['Experience_Level'] = le_exp.fit_transform(
    df['Experience_Level']
)

# CELL
extra_features = df[
    [
        'Experience (Years)',
        'Education',
        'Projects Count',
        'AI Score (0-100)',
        'Skill_Count',
        'Has_Certification',
        'High_AI_Score',
        'High_Projects',
        'Experience_Level'
    ]
]

# CELL
extra_features.head()

# CELL
from scipy.sparse import hstack

X = hstack([X_skills, extra_features])

y = df['Recruiter Decision']

# CELL
print(X.shape)

# CELL
# Train - Test split
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42,stratify=y)

# CELL
#Logistic regression
lr = LogisticRegression(max_iter=1000)

lr.fit(X_train, y_train)

y_pred_lr = lr.predict(X_test)

print(
    "Logistic Regression Accuracy:",
    accuracy_score(y_test, y_pred_lr)
)

# CELL
#Random Forest
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=200,random_state=42
)

rf.fit(X_train, y_train)

y_pred_rf = rf.predict(X_test)

print("Random Forest Accuracy:",accuracy_score(y_test, y_pred_rf))

# CELL
#SVM
from sklearn.svm import SVC

svm = SVC()

svm.fit(X_train, y_train)

y_pred_svm = svm.predict(X_test)

print(
    "SVM Accuracy:",
    accuracy_score(y_test, y_pred_svm)
)

# CELL
# GradientBoostingClassifier
from sklearn.ensemble import GradientBoostingClassifier

gb = GradientBoostingClassifier(random_state=42)

gb.fit(X_train, y_train)

y_pred_gb = gb.predict(X_test)

print(
    "Gradient Boosting Accuracy:",
    accuracy_score(y_test, y_pred_gb)
)

# CELL
#xgboost
from xgboost import XGBClassifier
from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()

y_train_enc = le.fit_transform(y_train)
y_test_enc = le.transform(y_test)

xgb = XGBClassifier(
    n_estimators=200,
    max_depth=4,
    learning_rate=0.05,
    random_state=42,
    eval_metric='logloss'
)

xgb.fit(X_train, y_train_enc)

y_pred_xgb = xgb.predict(X_test)

print(
    "XGBoost Accuracy:",
    accuracy_score(y_test_enc, y_pred_xgb)
)

# CELL
print("Logistic Regression :", accuracy_score(y_test, y_pred_lr))
print("Random Forest       :", accuracy_score(y_test, y_pred_rf))
print("SVM                 :", accuracy_score(y_test, y_pred_svm))
print("Gradient Boosting   :", accuracy_score(y_test, y_pred_gb))
print("XGBoost             :", accuracy_score(y_test_enc, y_pred_xgb))

# CELL
print(classification_report(y_test, y_pred_rf))

# CELL
X_hire = df.drop(
    ['Name', 'Recruiter Decision', 'Salary Expectation ($)'],
    axis=1
)

X_hire = pd.get_dummies(X_hire)

joblib.dump(
    X_hire.columns.tolist(),
    "/content/drive/MyDrive/Workforce_Project/models/hire_reject_columns.pkl"
)

print("Hire/Reject columns saved:", len(X_hire.columns))

# CELL
joblib.dump(
    rf,
    "/content/drive/MyDrive/Workforce_Project/models/hire_reject_model.pkl"
)

print("Hire/Reject model saved")