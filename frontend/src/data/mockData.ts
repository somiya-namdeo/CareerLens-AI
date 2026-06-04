export const SYSTEM_METRICS = {
  totalProcessed: 1248,
  hiringReadiness: '78%',
  avgProcessingTime: '1.2s',
  modelsOnline: 4,
};

export const PIPELINE_STEPS = [
  { id: 'upload', label: 'Resume Upload', status: 'completed' },
  { id: 'ocr', label: 'OCR Extraction', status: 'completed' },
  { id: 'features', label: 'Feature Engineering', status: 'processing' },
  { id: 'role', label: 'Job Role Prediction', status: 'pending' },
  { id: 'hire', label: 'Hire Probability', status: 'pending' },
  { id: 'salary', label: 'Salary Forecast', status: 'pending' },
  { id: 'skills', label: 'Skill Gap Detection', status: 'pending' },
  { id: 'report', label: 'Career Intelligence Report', status: 'pending' },
];

export const MODELS_DATA = [
  { name: 'Hire / Reject Prediction', algorithm: 'Random Forest Classifier', accuracy: 0.94, f1: 0.92, status: 'Active' },
  { name: 'Job Role Prediction', algorithm: 'Logistic Regression / TF-IDF', accuracy: 0.89, f1: 0.87, status: 'Active' },
  { name: 'Salary Prediction', algorithm: 'Regression Model', accuracy: 0.88, f1: null, metricType: 'R2', status: 'Active' },
  { name: 'OCR Resume Classification', algorithm: 'TF-IDF + SVM', accuracy: 0.96, f1: 0.95, status: 'Active' },
];

export const CANDIDATE_REPORT = {
  score: 84,
  hireProbability: 0.82,
  predictedRole: 'Senior Frontend Developer',
  estimatedSalary: '$120,000 - $140,000',
  modelConfidence: 0.91,
  currentSkills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Tailwind CSS'],
  missingSkills: ['GraphQL', 'System Design', 'Kubernetes'],
  recommendedSkills: ['GraphQL', 'Docker'],
  strengths: [
    { label: 'Technical Depth', value: 90 },
    { label: 'Experience Quality', value: 85 },
    { label: 'Project Impact', value: 88 }
  ],
  recommendations: [
    'Complete the "System Design for Web Developers" course.',
    'Obtain AWS Certified Solutions Architect credential.',
    'Contribute to open source GraphQL projects.'
  ]
};
