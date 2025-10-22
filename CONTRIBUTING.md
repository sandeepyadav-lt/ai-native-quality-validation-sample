# Contributing to Airbnb Clone

First off, thank you for considering contributing to the Airbnb Clone project! It's people like you that make this project better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to support@lambdatest.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** if possible.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most Airbnb Clone users.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript and React styleguides
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

### 1. Fork the Repository

Fork the project on GitHub and clone your fork locally.

```bash
git clone https://github.com/YOUR-USERNAME/airbnb-clone.git
cd airbnb-clone
git remote add upstream https://github.com/LambdaTest/airbnb-clone.git
```

### 2. Create a Branch

Create a branch for your work. Use a descriptive name:

```bash
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-description
```

### 3. Make Your Changes

* Write clean, readable code
* Follow existing code style
* Add tests for new features
* Update documentation as needed
* Commit your changes using descriptive commit messages

```bash
git add .
git commit -m "Add amazing feature"
```

### 4. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

### 5. Push Your Changes

```bash
git push origin feature/amazing-feature
```

### 6. Create a Pull Request

Go to the repository on GitHub and click "New Pull Request". Fill in the template with all relevant information.

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Examples:
```
Add user authentication feature
Fix crash when loading empty listings
Update README with new installation steps
```

### TypeScript Styleguide

* Use TypeScript for all new code
* Use meaningful variable names
* Add type annotations for function parameters and return values
* Avoid `any` type when possible
* Use interfaces for object types
* Use enums for fixed sets of values

### React Styleguide

* Use functional components with hooks
* Keep components small and focused
* Extract reusable logic into custom hooks
* Use descriptive prop names
* Add PropTypes or TypeScript interfaces for props
* Follow the single responsibility principle

### CSS/Tailwind Styleguide

* Use Tailwind utility classes when possible
* Keep custom CSS minimal
* Use consistent spacing and sizing
* Follow mobile-first approach
* Group related utilities together

## Project Structure

```
airbnb-clone/
├── backend/
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── data/        # Mock data
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── types/       # TypeScript types
│   └── tests/           # Backend tests
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable React components
    │   ├── pages/      # Page components
    │   ├── services/   # API services
    │   ├── store/      # State management
    │   └── types/      # TypeScript types
    └── tests/          # Frontend tests
```

## Testing

* Write tests for new features
* Ensure all tests pass before submitting PR
* Aim for good code coverage

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Documentation

* Update README.md if needed
* Add JSDoc comments for functions
* Update API documentation for new endpoints
* Add inline comments for complex logic

## Questions?

Feel free to ask questions in the GitHub issues or contact the maintainers directly.

## Recognition

Contributors will be recognized in the project README and releases.

Thank you for contributing! 🎉
