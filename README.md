# Audit recordings

## Description
App to schedule and make recordings in order to take notes and audit the video

## Installation
Instructions on how to install and set up the project.

## Usage
Examples of how to use the project.

## Contributing
Guidelines for contributing to the project.

## License
Information about the project's license.

## Contact
Contact information for the project maintainers.

----------------------------------------------------
## Architecture
Following the clean architecture:
https://medium.com/@rudrakshnanavaty/clean-architecture-7c1b3b4cb181
https://medium.com/@ben.dev.io/clean-architecture-in-node-js-39c3358d46f3

Clean architecture structure + screaming architecture of folders:
- entities
- use-cases
- Interfaces -> controllers, presenters, ..
    + controllers -> Handle input ports
    + presenters -> Handle output ports
- Infrastuctures -> Connection and queries to supabase

Below are an example

/backend
│   │   ├── /src
│   │   │   ├── /recordings
│   │   │   │   ├── /entities
│   │   │   │   │   ├── Recording.ts
│   │   │   │   ├── /useCases
│   │   │   │   │   ├── CreateRecordingUseCase.ts
│   │   │   │   │   ├── GetRecordingUseCase.ts
│   │   │   │   │   ├── DeleteRecordingUseCase.ts
│   │   │   │   ├── /interfaceAdapters
│   │   │   │   │   ├── /controllers
│   │   │   │   │   │   ├── RecordingController.ts
│   │   │   │   │   ├── /presenters
│   │   │   │   │   │   ├── RecordingPresenter.ts
│   │   │   │   ├── /frameworks
│   │   │   │   │   ├── SupabaseRecordingRepository.ts
│   │   │   ├── /audits
│   │   │   │   ├── /entities
│   │   │   │   │   ├── Audit.ts
│   │   │   │   ├── /useCases
│   │   │   │   │   ├── CreateAuditUseCase.ts
│   │   │   │   │   ├── UpdateAuditUseCase.ts
│   │   │   │   ├── /interfaceAdapters
│   │   │   │   │   ├── /controllers
│   │   │   │   │   │   ├── AuditController.ts
│   │   │   │   │   ├── /presenters
│   │   │   │   │   │   ├── AuditPresenter.ts
│   │   │   │   ├── /frameworks
│   │   │   │   │   ├── SupabaseAuditRepository.ts
│   │   │   ├── /reports
│   │   │   │   ├── /entities
│   │   │   │   │   ├── Report.ts
│   │   │   │   ├── /useCases
│   │   │   │   │   ├── GenerateReportUseCase.ts
│   │   │   │   ├── /interfaceAdapters
│   │   │   │   │   ├── /controllers
│   │   │   │   │   │   ├── ReportController.ts
│   │   │   │   │   ├── /presenters
│   │   │   │   │   │   ├── ReportPresenter.ts
│   │   │   │   ├── /frameworks
│   │   │   │   │   ├── PDFReportGenerator.ts
│   │   │   ├── /common
│   │   │   │   ├── /frameworks
│   │   │   │   │   ├── express.ts
│   │   │   │   │   ├── supabaseClient.ts
│   │   │   │   │   ├── errorHandler.ts
│   │   │   ├── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── Dockerfile
│   │   ├── .env
│   │   └── .eslintrc.js