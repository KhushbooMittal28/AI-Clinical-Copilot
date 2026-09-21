# Dataset

This folder contains the datasets used for the development and evaluation of the AI Clinical Copilot for Primary Care.

## Patient Dataset

The project will use synthetic patient data generated using **Synthea** for development and evaluation.

The dataset will support:

* Patient information management
* Clinical history processing
* Patient information summarization
* Prototype testing and evaluation

## Data Categories

The patient dataset is expected to include:

* Patient demographics
* Encounters
* Medical conditions
* Medications
* Observations
* Procedures

## Folder Structure

### `raw/`

Contains the original dataset files before any preprocessing or transformation.

### `processed/`

Contains cleaned and transformed data prepared for use by the application and experiments.

## Medical Knowledge Base

A separate collection of trusted medical reference and guideline documents will be used for the Retrieval-Augmented Generation (RAG) component of the system.

## Privacy

Synthetic patient data will be used for the prototype to avoid the use of real patient records during development and testing.

## Status

**Current status:** Dataset selection completed. Data preprocessing and integration are planned as the next development steps.
