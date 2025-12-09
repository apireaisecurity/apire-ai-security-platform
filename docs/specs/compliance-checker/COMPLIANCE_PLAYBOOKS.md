# Compliance Playbooks

## GDPR Playbook

### Step 1: Data Mapping

Use the scanner to identify all data entry points.

- **Action**: Tag all fields collecting PII (Name, Email, IP).

### Step 2: Consent Management

- **Check**: Does the UI have a cookie banner?
- **Check**: Is consent stored in the DB?

### Step 3: Right to Erasure

- **Action**: Implement the `/api/v1/user/delete` endpoint.
- **Verify**: Run the "Erasure Test" in Compliance Checker.

## EU AI Act Playbook

### Step 1: Classification

- **Questionnaire**: Answer the built-in risk assessment.
- **Result**: Determine if your system is "High Risk".

### Step 2: Technical Documentation

- **Action**: Use the "Report Builder" to generate the Annex IV template.
- **Fill**: Complete the sections on "Model Architecture" and "Training Data".

### Step 3: Human Oversight

- **Check**: Is there a "Human in the Loop" interface?
- **Verify**: Log all human interventions.
