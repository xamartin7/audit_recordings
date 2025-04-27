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
- domain -> entities
- application -> use-cases
    + Interfaces -> controllers, presenters, ..
    + use-cases
        + controllers -> Handle input ports
        + presenters -> Handle output ports
- Infrastuctures -> Connection and queries to supabase

Example with the auth below:
/auth
│   │   │   │   │   ├── /domain
│   │   │   │   │   │   ├── User.ts
│   │   │   │   │   │   ├── AuthToken.ts
│   │   │   │   │   ├── /application
│   │   │   │   │   │   ├── AuthFactory.ts
│   │   │   │   │   │   ├── LoginWithEmailUseCase.ts
│   │   │   │   │   │   ├── LoginWithGoogleUseCase.ts
│   │   │   │   │   │   ├── strategies
│   │   │   │   │   │   │   ├── LoginStrategy.ts
│   │   │   │   │   │   │   ├── EmailLoginStrategy.ts
│   │   │   │   │   │   │   ├── GoogleLoginStrategy.ts
│   │   │   │   │   │   ├── interfaces
│   │   │   │   │   │   │   ├── AuthRepository.ts
│   │   │   │   │   ├── /infrastructure
│   │   │   │   │   │   ├── /http
│   │   │   │   │   │   │   ├── AuthController.ts
│   │   │   │   │   │   ├── /supabase
│   │   │   │   │   │   │   ├── SupabaseAuthRepository.ts
│   │   │   │   │   │   ├── /google
│   │   │   │   │   │   │   ├── GoogleOAuthProvider.ts
│   │   │   │   ├── /recordings
│   │   │   │   ├── /audits
│   │   │   │   ├── /reports
│   │   │   │   ├── /common
│   │   │   │   │   ├── express.ts
│   │   │   │   │   ├── supabaseClient.ts