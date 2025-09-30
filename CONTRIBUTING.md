# Contributing to Issue Tracker

Thank you for considering contributing to Issue Tracker! This document provides guidelines and information for contributors.

## 🎯 How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating new issues
3. **Provide detailed information:**
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details (OS, browser, Node.js version)
   - Screenshots if applicable

### Suggesting Features

1. **Open an issue** with the `enhancement` label
2. **Describe the feature** in detail
3. **Explain the use case** and benefits
4. **Consider implementation complexity**

### Code Contributions

#### Prerequisites
- Node.js 18.17+
- Basic knowledge of React, Next.js, TypeScript
- Familiarity with Prisma ORM

#### Development Setup

1. **Fork and clone:**
   ```bash
   git clone https://github.com/yourusername/issue-tracker.git
   cd issue-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

#### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes:**
   ```bash
   npm run build    # Ensure build passes
   npm run lint     # Check code quality
   ```

4. **Commit with descriptive messages:**
   ```bash
   git commit -m "feat: add issue assignment functionality"
   ```

5. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Coding Standards

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type - use proper typing
- Use meaningful variable and function names

### React/Next.js
- Use functional components with hooks
- Implement proper error boundaries
- Follow React best practices for performance
- Use Next.js App Router conventions

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Use consistent naming conventions:
  - `camelCase` for variables and functions
  - `PascalCase` for components and types
  - `UPPER_CASE` for constants

### Database
- Write descriptive migration names
- Always include `down` migrations
- Follow Prisma schema conventions
- Test migrations thoroughly

## 🏗️ Project Structure Guidelines

### File Organization
```
app/
├── components/          # Reusable UI components
├── (pages)/            # Page components
├── api/               # API routes
└── utils/             # Utility functions

lib/                   # Configuration and setup
prisma/               # Database schema and migrations
public/               # Static assets
types/                # TypeScript type definitions
```

### Component Guidelines
- One component per file
- Export as default when possible
- Include PropTypes or TypeScript interfaces
- Write JSDoc comments for complex components

### API Route Guidelines
- Use proper HTTP status codes
- Implement proper error handling
- Validate input data with Zod schemas
- Include authentication checks where needed

## 🧪 Testing Guidelines

### Before Submitting PR
1. **Build passes:** `npm run build`
2. **Linting passes:** `npm run lint`
3. **Database migrations work:** Test with fresh database
4. **Features work end-to-end:** Test in browser

### Manual Testing Checklist
- [ ] Authentication flow works
- [ ] Issue CRUD operations function
- [ ] Filtering and pagination work
- [ ] Mobile responsiveness
- [ ] Error states display properly

## 📋 Pull Request Process

### PR Requirements
1. **Descriptive title** following conventional commits
2. **Clear description** of changes made
3. **Link related issues** with "Fixes #123" or "Closes #123"
4. **Screenshots** for UI changes
5. **Breaking changes** clearly documented

### PR Review Process
1. **Automated checks** must pass (build, lint)
2. **Code review** by maintainer
3. **Testing** by reviewer
4. **Approval** required before merge

### Conventional Commit Format
```
type(scope): description

feat(auth): add Google OAuth integration
fix(issues): resolve pagination bug
docs(readme): update installation instructions
style(components): improve button styling
refactor(api): optimize database queries
test(issues): add unit tests for CRUD operations
```

## 🎨 Design Guidelines

### UI/UX Principles
- **Accessibility first** - Use semantic HTML and ARIA labels
- **Mobile responsive** - Test on various screen sizes
- **Consistent spacing** - Follow Tailwind CSS conventions
- **Clear feedback** - Loading states and error messages

### Component Design
- **Reusable components** - Write flexible, configurable components
- **Radix UI integration** - Use Radix primitives when possible
- **Dark mode support** - Consider theme compatibility
- **Performance** - Optimize for Core Web Vitals

## 🐛 Debugging

### Common Development Issues

#### Database Issues
```bash
# Reset database
npm run db:migrate:reset

# Check schema
npx prisma studio

# Generate new client
npm run db:generate
```

#### Build Issues
```bash
# Clear cache
rm -rf .next node_modules
npm install

# Check TypeScript
npx tsc --noEmit
```

#### Authentication Issues
- Check Google OAuth configuration
- Verify environment variables
- Test in incognito mode

## 📞 Getting Help

### Resources
- **Next.js Documentation:** https://nextjs.org/docs
- **Prisma Documentation:** https://www.prisma.io/docs
- **NextAuth.js Documentation:** https://next-auth.js.org

### Support Channels
- **GitHub Issues:** For bug reports and feature requests
- **GitHub Discussions:** For questions and general discussion
- **Stack Overflow:** Tag with `next.js`, `prisma`, `nextauth`

## 🏆 Recognition

Contributors will be recognized in:
- README.md acknowledgments
- CHANGELOG.md entries
- GitHub contributor graphs

Thank you for contributing to Issue Tracker! 🚀