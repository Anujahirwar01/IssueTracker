import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

const dummyIssues = [
  {
    title: "Login page not responding on mobile devices",
    description: "Users are reporting that the login page becomes unresponsive on mobile devices, particularly on iOS Safari. The submit button doesn't work and form validation isn't triggering properly.",
    status: "OPEN"
  },
  {
    title: "Database connection timeout in production",
    description: "We're experiencing intermittent database connection timeouts in the production environment. This seems to happen during peak hours and affects user experience significantly.",
    status: "IN_PROGRESS"
  },
  {
    title: "Dark mode toggle not persisting user preference",
    description: "When users toggle dark mode, the preference is not being saved. After refreshing the page or reopening the application, it reverts back to light mode.",
    status: "CLOSED"
  },
  {
    title: "Email notifications not being sent",
    description: "The email notification system appears to be failing silently. Users are not receiving confirmation emails, password reset emails, or any other automated notifications.",
    status: "OPEN"
  },
  {
    title: "Performance issues with large dataset loading",
    description: "When loading datasets with more than 1000 records, the application becomes very slow and sometimes crashes. We need to implement pagination or lazy loading.",
    status: "IN_PROGRESS"
  },
  {
    title: "UI components not aligned properly on tablet screens",
    description: "Several UI components are misaligned when viewed on tablet devices in landscape orientation. This affects the overall user experience and makes the app look unprofessional.",
    status: "OPEN"
  },
  {
    title: "Search functionality returns incorrect results",
    description: "The search feature is returning irrelevant results and sometimes fails to find exact matches. The search algorithm needs to be improved for better accuracy.",
    status: "CLOSED"
  },
  {
    title: "File upload fails for files larger than 10MB",
    description: "Users cannot upload files larger than 10MB. The upload process starts but fails without any error message. We need to either increase the limit or provide better error handling.",
    status: "OPEN"
  },
  {
    title: "Memory leak in dashboard component",
    description: "The dashboard component appears to have a memory leak. After keeping the dashboard open for extended periods, browser performance degrades significantly.",
    status: "IN_PROGRESS"
  },
  {
    title: "Broken links in navigation menu",
    description: "Several links in the main navigation menu are returning 404 errors. This includes the 'About Us' and 'Contact' pages.",
    status: "CLOSED"
  },
  {
    title: "API rate limiting not working correctly",
    description: "The API rate limiting implementation is not functioning as expected. Some users are able to exceed the defined limits without being throttled.",
    status: "OPEN"
  },
  {
    title: "Responsive design issues on small screens",
    description: "The application layout breaks on screens smaller than 320px width. Text overlaps, buttons become inaccessible, and the overall UX is poor.",
    status: "IN_PROGRESS"
  },
  {
    title: "Session timeout handling needs improvement",
    description: "When user sessions expire, the application doesn't handle it gracefully. Users lose their work and get confusing error messages.",
    status: "OPEN"
  },
  {
    title: "Incorrect timezone display in timestamps",
    description: "All timestamps are showing in UTC instead of the user's local timezone. This causes confusion when viewing creation dates and deadlines.",
    status: "CLOSED"
  },
  {
    title: "Form validation messages are not user-friendly",
    description: "Current form validation messages are too technical and not helpful for end users. We need to make them more descriptive and actionable.",
    status: "OPEN"
  },
  {
    title: "Print functionality doesn't work in Chrome",
    description: "The print feature works fine in Firefox and Safari but fails to generate proper output in Chrome browsers. Some CSS styles are not being applied correctly.",
    status: "IN_PROGRESS"
  },
  {
    title: "Drag and drop interface is not intuitive",
    description: "Users are having difficulty understanding how to use the drag and drop functionality. We need better visual cues and user guidance.",
    status: "OPEN"
  },
  {
    title: "Security vulnerability in user authentication",
    description: "A potential security vulnerability has been identified in the user authentication system. This needs immediate attention to prevent unauthorized access.",
    status: "CLOSED"
  },
  {
    title: "Slow page loading times on initial visit",
    description: "First-time visitors experience very slow page loading times. This is likely due to large bundle sizes and lack of proper caching strategies.",
    status: "IN_PROGRESS"
  },
  {
    title: "Export to PDF feature generates corrupted files",
    description: "When users try to export reports to PDF format, the generated files are often corrupted or have missing content. This affects data sharing capabilities.",
    status: "OPEN"
  }
];

async function main() {
  console.log('Starting to seed database with dummy issues...');
  
  try {
    // Get the first user from the database to use as author
    const firstUser = await prisma.user.findFirst();
    
    if (!firstUser) {
      console.log('No users found in database. Please create a user first by signing in to the application.');
      return;
    }

    console.log(`Using user ${firstUser.email} as the author for all dummy issues.`);

    // Create all dummy issues
    const createdIssues = await Promise.all(
      dummyIssues.map((issue, index) => 
        prisma.issue.create({
          data: {
            title: issue.title,
            description: issue.description,
            status: issue.status as 'OPEN' | 'IN_PROGRESS' | 'CLOSED',
            authorId: firstUser.id,
            createdAt: new Date(Date.now() - (19 - index) * 24 * 60 * 60 * 1000), // Spread over 20 days
            updatedAt: new Date(Date.now() - (19 - index) * 24 * 60 * 60 * 1000)
          }
        })
      )
    );

    console.log(`✅ Successfully created ${createdIssues.length} dummy issues!`);
    
    // Show summary of created issues
    const statusCounts = {
      OPEN: dummyIssues.filter(i => i.status === 'OPEN').length,
      IN_PROGRESS: dummyIssues.filter(i => i.status === 'IN_PROGRESS').length,
      CLOSED: dummyIssues.filter(i => i.status === 'CLOSED').length
    };
    
    console.log('📊 Summary:');
    console.log(`   🔴 Open: ${statusCounts.OPEN}`);
    console.log(`   🟡 In Progress: ${statusCounts.IN_PROGRESS}`);
    console.log(`   🟢 Closed: ${statusCounts.CLOSED}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });