
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
import os
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
salary_df = pd.read_csv("/content/workforce_project/datascience_salary/ds_salaries.csv")

print(salary_df.shape)
salary_df.columns.tolist()

# CELL
salary_df.info()

# CELL
salary_df.isnull().sum()

# CELL
salary_df.duplicated().sum()

# CELL
salary_df.describe()

# CELL
salary_df['experience_level'].value_counts()

# CELL
salary_df['experience_level'].value_counts().plot(kind='bar')

# CELL
salary_df.groupby('experience_level')['salary_in_usd'].mean()

# CELL
salary_df['employment_type'].value_counts()

# CELL
salary_df.groupby('employment_type')['salary_in_usd'].mean()

# CELL
salary_df['company_size'].value_counts()

# CELL
salary_df.groupby('company_size')['salary_in_usd'].mean()

# CELL
salary_df['remote_ratio'].value_counts()

# CELL
salary_df.groupby('remote_ratio')['salary_in_usd'].mean()

# CELL
salary_df['job_title'].value_counts().head(15)

# CELL
salary_df.groupby('job_title')['salary_in_usd'].mean()\.sort_values(ascending=False)\.head(15)

# CELL
plt.figure(figsize=(8,5))
plt.hist(salary_df['salary_in_usd'], bins=30)
plt.title("Salary Distribution")
plt.show()

# CELL
salary_df.drop('Unnamed: 0', axis=1, inplace=True)

# CELL
salary_df = salary_df.drop(['salary', 'salary_currency'],axis=1)

# CELL
salary_encoded = pd.get_dummies(
    salary_df,
    columns=[
        'experience_level',
        'employment_type',
        'job_title',
        'employee_residence',
        'company_location',
        'company_size'
    ],
    drop_first=True
)

# CELL
X = salary_df.drop('salary_in_usd', axis=1)

y = salary_df['salary_in_usd']

# CELL
X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)

# CELL
# LINEAR REGRESSION
lr = LinearRegression()

lr.fit(X_train, y_train)

pred_lr = lr.predict(X_test)

print("R2:",r2_score(y_test, pred_lr))

print("RMSE:",mean_squared_error(y_test, pred_lr)**0.5)

# CELL
# RANDOM FOREST REGRESSOR
rf = rf = RandomForestRegressor(n_estimators=300,max_depth=8,min_samples_split=10,min_samples_leaf=4,random_state=42)

rf.fit(X_train, y_train)

pred_rf = rf.predict(X_test)

print("R2:",r2_score(y_test, pred_rf))

print("RMSE:",mean_squared_error(y_test, pred_rf)**0.5)

# CELL
#xgBoost Regressor
from xgboost import XGBRegressor

xgb = XGBRegressor(n_estimators=500,max_depth=6,learning_rate=0.05,random_state=42)

xgb.fit(X_train, y_train)

pred = xgb.predict(X_test)

print(r2_score(y_test, pred))
print(mean_squared_error(y_test,pred)**0.5)

# CELL
print("RF Train R2:",
      r2_score(y_train, rf.predict(X_train)))

print("RF Test R2:",
      r2_score(y_test, rf.predict(X_test)))

# CELL
df2['current_title'].value_counts().head(20)

# CELL
df2['skills'].head()

# CELL
salary_results = pd.DataFrame({
    'Model': [
        'Linear Regression',
        'Random Forest',
        'Tuned Random Forest',
        'XGBoost'
    ],
    'R2 Score': [
        0.3179,
        0.5603,
        0.5709,
        0.5001
    ],
    'RMSE': [
        51125.49,
        41050.00,
        40551.96,
        43768.75


    ]
})

salary_results

# CELL
os.makedirs('/content/drive/MyDrive/Workforce_Project/models', exist_ok=True)

# CELL
os.makedirs('/content/drive/MyDrive/Workforce_Project/models', exist_ok=True)

joblib.dump(rf, '/content/drive/MyDrive/Workforce_Project/models/salary_model.pkl')
joblib.dump(X.columns.tolist(), '/content/drive/MyDrive/Workforce_Project/models/salary_columns.pkl')

# CELL
os.listdir('/content/drive/MyDrive/Workforce_Project/models')