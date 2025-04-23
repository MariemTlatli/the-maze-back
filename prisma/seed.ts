import { PrismaClient, Tech } from '@prisma/client';

const prisma = new PrismaClient();

async function seedWorkshops() {
  const workshopsData = [
    { name: 'AI' },
    { name: 'API communication' },
    { name: 'SAP' },
    { name: 'UI/UX Design' },
    { name: 'Mobile Dev with Flutter' },
    { name: 'Cyber Security' },
  ];

  return prisma.workshop.createMany({
    data: [...workshopsData],
  });
}

async function seedFacs() {
  const facsData = [
    { name: 'ISSAT sousse' },
    { name: 'Pristini' },
    { name: 'ENISO' },
    { name: 'EPI' },
    { name: 'ISET SOUSSE' },
    {
      name: 'ISITCOM',
    },
    { name: 'ISG SOUSSE' },
  ];
  return prisma.fac.createMany({
    data: [...facsData],
  });
}
async function seedDomaines() {
  const domainesData = [
    { name: 'Digital Learning' },
    { name: 'Fin Tech' },
    { name: 'Health Tech' },
    { name: 'Travel Quest' },
  ];
  return prisma.domaine.createMany({
    data: [...domainesData],
  });
}
async function seedChallenges() {
  // Données JSON extraites
  const jsonData = [
    {
      id: 1,
      name: 'Smart Flashcards App',
      number: 1,
      points: 200,
      description:
        '### Flashcards App \n#### Flashcard Creation 📝\n- Add flashcards with:\n  - Text-based questions and answers  \n  - Optional images for either field\n- Store data locally \n\n#### Categories & Tags 🗂️\n- Organize flashcards by subjects\n- Optionally add tags for better filtering and grouping\n\n#### Progress Tracking 📊\n- Track learning progress per subject\n- Show stats like: “You know 80% of Chemistry cards”\n\n---\n\n### Bonus Features\n \n- Animations\n : Add subtle animations (e.g., card flip, transitions)\n\n - Dark/Light Mode\n\n- Voice-to-Text Input\n',

      tech: 'MOBILE',
      domaineId: 1,
    },
    {
      id: 2,
      name: 'Mystery Quest Travel App',
      number: 3,
      points: 499,
      description:
        '**Key Features (Tasks) for your Flutter App:**\n\n1. **Location-Based Quests:**\n\n-  Implement interactive quests that users can unlock based on their geographic location.\n- Provide clues and challenges to guide users to the next destination.\n\n2. **Puzzle Solving:**\n\n\n- Create engaging puzzles, riddles, or challenges that users must solve to progress in their quest.\n- Include a variety of difficulty levels to cater to different users.\n\n3. **Rewards System**:\n\n- Offer virtual rewards (e.g., badges, points) or real-world incentives (e.g., discounts at local businesses) for completing quests.\n- Allow users to track their achievements and share them on social media.\n\n4. **Rewards System:**\n\n- Offer virtual rewards (e.g., badges, points) or real-world incentives (e.g., discounts at local businesses) for completing quests.\n- Allow users to track their achievements and share them on social media.\n\n4. **Interactive Map:**\n\n- Develop a map interface that displays quest locations, clues, and user progress.\n\n',
      tech: 'MOBILE',
      domaineId: 4,
    },
    {
      id: 3,
      name: 'Automated Email Notification System for Online Sessions in an Educational Institution',
      number: 4,
      points: 650,
      description:
        "Automated Email Notification System for Online Sessions in an Educational Institution\n\n**Description:**\n\nThe goal of this project is to develop a mobile application using Flutter that automates the process of sending email notifications to students regarding their upcoming online sessions. The application should be user-friendly for administrators and integrate seamlessly with the institution's existing systems. It should allow administrators to schedule sessions, manage student lists, and automatically send reminder emails to participants.\n\n**Tasks :**\n\n\n**1.Design the User Interface (UI):**\n\n- Create  an intuitive and responsive UI for administrators to manage sessions and student lists.\nInclude features like session scheduling, student registration, and email template customization.\n\n**2.Develop the Backend Logic:**\n\n- Implement functionality to store session details (date, time, topic, etc.) and student email addresses.\n- Integrate an email service to send automated emails.\n\n**3.Automate Email Notifications:**\n\n- Set up a system to send reminder emails to students 24 hours before the session.\n- Include session details (date, time, link, etc.) in the email body.\n\n**4.Implement User Authentication:**\n\n- Add a secure login system for administrators to access the app.",

      tech: 'MOBILE',
      domaineId: 1,
    },
    {
      id: 5,
      name: 'Learning Hub',
      number: 101,
      points: 600,
      description:
        '🎯 **Project Objective**\n\nDevelop a Flutter mobile application that allows content creators to import course documents (PDFs) and manually organize them into chapters and sub-chapters. The application will include a secure and lightweight backend system, built with Flask, a Python-based web framework.\nLearners can browse structured content, complete self-assessments, track their progress, and receive revision recommendations. The app provides smooth navigation and a personalized experience based on user roles.\n\n🌟 Key Features\n\n   1. PDF Import and Manual Structuring\n\n        - Import PDF files\n\n        - Allow content creators to:\n\n           -  Add titles, chapters, and sub-chapters manually\n\n            -   Assign specific text excerpts to a custom structure\n\n   2. Multilingual Content (Manually Provided)\n\n         -  Let content creators provide translated versions of the texts\n\n        -   Display multilingual content for learners (language selection available)\n\n 3. Manual Quiz and Question Creation\n\n   -   Interface to manually add:\n\n          -  Multiple Choice Questions (MCQs)\n\n          -   True/False Questions\n\n          -  Open-ended Questions\n\n   -   Link each quiz to a chapter or sub-chapter\n\n   4. Progress Tracking\n\n   -   Learner dashboard including:\n\n         -   Overall score\n\n          -  Completed/in-progress chapters\n\n          - Quiz attempt history\n\n          -  Revision suggestions based on performance\n\n   5 - Chapter-based Navigation\n\n   -  Clean interface for structured course navigation\n\n  -  Tree-view for chapters and sub-chapters\n\n 6. Role-based Access Management\n\n       -   Administrator\n\n            Manages users and supervises the platform\n\n       -  Content Creator\n\n            Manages documents, chapters, and quizzes\n\n       -  Learner\n\n            Views courses and completes evaluations\n\n       -   Visitor\n\n            Limited access to public content: homepage, testimonials, and course previews',
      tech: 'MOBILE',
      domaineId: 1,
    },
    {
      id: 6,
      name: 'Interactive Football Player Performance Tracker',
      number: 151,
      points: 250,
      description:
        "# Description:\nThis project is an interactive web-based application designed to showcase the performance stats of top football players. The application presents a collection of player cards, each displaying basic information such as the player's name, jersey number, and photo. When a user clicks on a player card, detailed performance stats are revealed, including speed, passes, dribbles, pass accuracy, assists, and goals. This application is perfect for football enthusiasts who want to explore and compare the skills of their favorite players in a fun and engaging way.\n\n# Key Features of the Project:\n## 1.User-Friendly Interface:\nThe application features a clean and intuitive design, ensuring ease of use for all users.\nA responsive layout allows users to interact with the application comfortably on both desktop and mobile devices.\n## 2.Interactive Player Cards:\n\nEach player card displays the player's name, jersey number, and photo.\nClicking on a card reveals detailed performance stats in a visually appealing manner.\n## 3.Dynamic Stats Display:\n\nWhen a player card is clicked, the application dynamically displays the following stats:\nSpeed (km/h): Top speed achieved during matches.\nPasses: Total number of passes attempted.\nDribbles: Total number of successful dribbles.\nPass Accuracy (%): Percentage of successful passes.\nAssists: Total number of assists.\nGoals: Total number of goals scored .\n##  4.Engaging Design:\nModern styling techniques enhance the visual appeal of the player cards and stats display.\nThe color scheme and typography create a professional and inviting atmosphere for users.\n## 5.Educational and Fun:\n\nThe application provides an engaging way for users to learn about the performance metrics of top football players.\nIt encourages users to explore and appreciate the skills and contributions of their favorite players.\n### Example Use Case:\nA user clicks on Player X’s card and sees his stats:\nSpeed: 32 km/h\nPasses: 1200\nDribbles: 90\nPass Accuracy: 91%\nAssists: 25\nGoals: 15\n",

      tech: 'WEB',
      domaineId: 3,
    },
    {
      id: 7,
      name: 'Interactive Map Pins',
      number: 152,
      points: 250,
      description:
        '# Description:\n\nThis mini web app allows users to explore travel destinations by interacting with map pins. Each pin represents a famous global city or landmark. When clicked, the pin reveals interesting facts or travel tips related to that location. The design includes a visually appealing map background with clean, responsive UI elements to enhance user engagement.\n\n# Key Features of the Project:\n\n## 1.User-Friendly Interface:\nThe interface is simple and intuitive, with visually marked pins on a world map. Users can easily click on a pin to reveal useful travel tips.\n## 2.Interactive Map Pins:\nEach pin is clickable and reveals a tooltip containing a travel fact or tip.\nUsers can explore various locations by clicking different pins.\n## 3.Dynamic Tooltip Display:\nWhen a pin is clicked, a styled tooltip appears near the pin, showing information about the destination such as:\nFamous landmarks\nCultural tips\nFun facts or travel advice\n## 4.Engaging Design:\nThe map background, soft color palette, and clean pin design contribute to a polished and professional appearance. Responsive layout ensures compatibility across screen sizes.\n## 5.Educational and Fun:\nUsers learn about different destinations around the world in a playful and visual way. The app inspires curiosity and wanderlust.\n### Example Use Case:\n\nA user clicks a pin on Tokyo and sees:\n\n“🇯🇵 Tokyo: Visit during cherry blossom season for a stunning sight.”',
      tech: 'WEB',
      domaineId: 4,
    },
    {
      id: 8,
      name: 'Travel Packing Checklist App',
      number: 153,
      points: 350,
      description:
        '# Description:\n\nThis challenge tasks users with creating a simple interactive travel checklist. Users can type in items to pack, mark them as packed, or remove them. It’s a beginner-friendly JavaScript app that uses DOM manipulation to create a smooth, real-time experience. The styling is minimal and modern to simulate a mobile checklist app.\n\n# Key Features of the Project:\n\n## 1.User-Friendly Interface:\nA centered, responsive layout with a text input and an add button. Checklist items are displayed clearly, with options to mark or remove.\n## 2.Interactive Checklist Items:\nUsers can add items like “Passport” or “Sunglasses.”\nEach item can be checked off or deleted.\n## 3.Dynamic DOM Updates:\nAll interactions (add, check, delete) are handled in real time using JavaScript. No page reloads or forms needed.\n## 4.Modern Design Aesthetic:\nSoft shadows, rounded cards, and clear typography give the app a polished and modern travel vibe.\nEducational and Fun:\nUsers practice fundamental JavaScript skills like event listeners and DOM manipulation while building a real-life tool.\n### Example Use Case:\n\nA user types in “Camera” → clicks add → sees “Camera” in their list → checks it off as packed → removes it when done.\n\n',
      tech: 'WEB',
      domaineId: 4,
    },
    {
      id: 12,
      name: 'Travel Destination Voting App',
      number: 154,
      points: 400,
      description:
        '# Description:\n\nIn this mini-project, users vote on their favorite dream destinations. Each destination is displayed with a name, image, and vote count. When a user clicks the vote button, the count increases instantly. This app teaches basic data manipulation and user interaction using JavaScript while providing a fun interface to engage users.\n\n# Key Features of the Project:\n\n## 1.User-Friendly Interface:\nA clean grid layout displays each destination as a card with an image, name, and vote button.\n## 2.Interactive Voting System:\nClicking the vote button increases the count in real time.\nUsers can vote for any number of destinations.\n## 3.Dynamic Stats Update:\nThe vote count updates live on screen without reloading the page.\n## 4.Visual Appeal:\nDestination images and clean styling make the interface visually inviting. Responsive design ensures usability on mobile and desktop.\n## 5.Educational and Fun:\nThis app introduces the concept of event handling, real-time updates, and basic data logic. It’s great for learners and fun for users who want to express their travel dreams.\n### Example Use Case:\n\nA user clicks on “Bali” → vote count goes from 17 to 18 instantly → the card gives slight feedback on click.',

      tech: 'WEB',
      domaineId: 4,
    },
    {
      id: 13,
      name: 'Healthy Meal Planner',
      number: 155,
      points: 220,
      description:
        '# Description:\n\nCreate a simple app where users can add healthy meals to a weekly planner. Each day of the week has a section where users can input meals and see an overview of their planned nutrition. It helps users visually organize their diet.\n\n# Key Features of the Project:\n\n## 1.User-Friendly Interface:\nA weekly grid layout with days labeled and input fields or meal cards for each day.\n## 2.Interactive Meal Input:\nUsers type in a meal (e.g., “Grilled Chicken + Quinoa”) and assign it to a specific day.\n## 3.Dynamic Updates:\nMeals are shown immediately in the planner. Users can delete or replace meals easily.\n## 4.Clean and Inviting Design:\nA color-coded layout with soft greens and blues to reflect a healthy theme.\n## 5.Educational and Fun:\nEncourages users to think about balanced meals and builds practical JS form-handling skills.\n### Example Use Case:\n\nA user clicks on "Tuesday", types “Avocado Toast + Orange Juice”, and sees it appear under that day instantly.',

      tech: 'WEB',
      domaineId: 3,
    },
    {
      id: 14,
      name: 'Mental Health Mood Tracker',
      number: 156,
      points: 210,
      description:
        '# Description:\n\nBuild an app that lets users track their daily mood. Users choose how they feel (happy, sad, stressed, etc.) using emojis or color-coded buttons. The app logs the mood for that date and displays a mood history.\n\n# Key Features of the Project:\n\n## 1.User-Friendly Interface:\nMood options shown as emojis or icons in a clean layout. Easy one-tap input.\n## 2.Interactive Logging System:\nClicking an emoji logs the mood for the current day. All logs are shown in a history list.\n## 3.Mood History Display:\nDisplay moods by date with color-coded indicators or icons.\n## 4.Visually Calming Design:\nUses pastel tones and soft shapes to create a calming experience. Animations add a smooth feel.\n## 5.Educational and Fun:\nIntroduces date-based logging, visual feedback, and encourages self-care awareness.\n### Example Use Case:\n\nUser clicks 😄 on April 18th → it logs “Happy” with a smiley next to the date in their mood history.',
      tech: 'WEB',
      domaineId: 3,
    },
    {
      id: 17,
      name: 'Water Intake Tracker',
      number: 157,
      points: 350,
      description:
        '# Description:\nThis challenge involves creating a Water Intake Tracker web application designed to help users track their daily hydration goals and monitor their water consumption throughout the day. The app features an interactive water bottle that fills up as users log their water intake by clicking different buttons (50ml, 100ml, 150ml, 200ml, or 250ml).\n\nThe primary goal is to encourage users to stay hydrated by providing a clear visual representation of their water intake progress towards their daily hydration goal, typically set at 2000ml (2 liters).\n\n# Key Features:\n## 1.Interactive Water Bottle: \nThe visual representation of the water bottle increases in height as users add water.\n## 2.Customizable Buttons: \nButtons for adding 50ml, 100ml, 150ml, 200ml, and 250ml increments, making it easy to track water consumption with flexibility.\n## 3.Real-Time Updates: \nThe app dynamically updates the water level and displays the total amount consumed, keeping users informed.\n## 4.Daily Goal: \nUsers are encouraged to reach a daily target of 2000ml of water, with the app clearly displaying how much is left to reach the goal.\n## 5.Remaining Water:\n The app shows a message indicating how many milliliters are remaining to reach the goal, giving users an extra motivational push throughout the day.\n## 6.Responsive Design: \nThe application is optimized for both mobile and desktop users, ensuring ease of use regardless of device.\n### Example Use Case:\nA user starts the day by clicking the 100ml button, then later adds another 250ml. As they continue through the day, the water bottle visually fills up, and the progress text updates in real time. The user can see a message that says, for example, "You need 1650ml more to reach your goal!" until they reach 2000ml.',

      tech: 'WEB',
      domaineId: 3,
    },
    {
      id: 18,
      name: 'Interactive To-Do List for Study Tasks',
      number: 158,
      points: 380,
      description:
        '# Description:\nBuild an interactive To-Do List application designed for students to help them organize and manage their study tasks. This app will allow users to create tasks, set deadlines, mark tasks as complete, and categorize tasks by subject. Additionally, it will allow users to add reminders and view a progress bar indicating the completion percentage of all tasks.\n\n# Key Features:\n## 1.Task Creation: \nUsers can add tasks with a title, description, and due date.\nTask Categories: Categorize tasks by subjects like Math, History, Science, etc., and use colors to differentiate between categories.\n## 2.Due Date Reminder: \nAdd reminders for each task, and display tasks that are overdue or approaching.\n## 3.Mark as Complete: \nUsers can mark tasks as completed, and completed tasks will be crossed out or moved to a completed list.\n## 4.Progress Tracker:\n The app shows a progress bar that updates based on the percentage of completed tasks.\n## 5.Interactive UI: \nTasks are draggable to reorder, and users can filter tasks by categories or due dates.\n## 6.Responsive Design:\nMobile and desktop-friendly design, ensuring accessibility on any device.\n### Example Use Case:\nUser: Sarah, a student, needs to manage her study tasks.\n### 1.\nShe adds a task "Complete History homework" under the History category, with a due date of April 22.\n###  2.\nLater, she adds another task "Read Chemistry chapters 1-3" under Chemistry, with a due date of April 25.\n### 3.\nAs Sarah completes the History homework, she marks it as complete, and the progress bar updates to show her progress on all tasks.\n### 4.\nSarah can also view her tasks by category (e.g., only see Chemistry tasks) to stay focused on her current subject.\n#### Bonus Features :\n##### 1.Task Prioritization: \nAllow users to assign priority levels (High, Medium, Low) to each task, which will visually indicate urgency.\n##### 2.Notifications: \nSend a daily reminder for pending tasks.\n##### 3.Notes Section:\n Add a small note area for each task where users can jot down extra details or study tips.\n##### 4.Dark Mode: \nInclude a toggle button for switching to dark mode for a more comfortable user experience during long study sessions.\n',
      tech: 'WEB',
      domaineId: 1,
    },
    {
      id: 19,
      name: 'Study Habit Tracker',
      number: 159,
      points: 300,
      description:
        '# Description:\n\nCreate a web application that allows users to track their daily study habits. Users can log their study time each day, set goals, and view progress over time with charts. The app will provide users with visual feedback on how consistently they are meeting their study goals.\n\n# Key Features:\n\n### 1.\nDaily log input for the number of hours studied.\n### 2.\nGoals setting (e.g., 2 hours/day).\n### 3.\nVisual representation of study consistency (e.g., charts).\n### 4.\nNotifications to remind users to study.\n### 5.\nView historical data on past study habits.',

      tech: 'WEB',
      domaineId: 1,
    },
    {
      id: 20,
      name: 'Virtual Study Group',
      number: 160,
      points: 550,
      description:
        "# Description:\nBuild an interactive web application that enables users to create and join virtual study groups. Each group will have a personalized discussion board, file-sharing section, and a calendar to schedule study sessions. Users can interact with group members in real-time, share resources, and manage their study sessions efficiently.\n\n# Key Features:\n## 1.Create or Join Study Groups: \nUsers can create new study groups with custom names and join existing groups. A list of available groups is displayed, and users can join any group with a simple click.\n## 2.Discussion Board:\n Each group has a dedicated discussion board where users can post messages with their username and a timestamp. The messages are displayed in a chat-like format, allowing for real-time group communication. Users can also delete their own messages.\n## 3.Shared File Sharing:\n Users can upload files (documents, images, videos) to the study group. The uploaded file's name, type, and size are displayed for easy access, allowing group members to share and review resources.\n## 4.Study Session Calendar: \nUsers can schedule study sessions by selecting a date and time. The calendar allows the group to manage and schedule study sessions, making it easier to coordinate study plans.\n## 5.Real-Time Notifications: \nThe application provides instant notifications for actions such as posting messages, deleting messages, or scheduling study sessions. These notifications confirm the success of each action, enhancing the interactive experience.",

      tech: 'WEB',
      domaineId: 1,
    },
    {
      id: 21,
      name: 'Interactive Landing Page',
      number: 161,
      points: 250,
      description:
        '# Description:\n\nThis sleek, single-page web app acts as the landing page for a smart business consultancy firm. It introduces users to the company’s mission and core services with a modern, professional design. Users can explore various service cards—such as Consulting, Marketing, and Software Development—that lead to dedicated pages for each offering. The layout is fully responsive, with smooth animations, bold call-to-actions, and a polished aesthetic tailored for startups or professional businesses.\n\n# Key Features of the Project:\n## 1.Professional User Interface\n*Clean, responsive layout with modern typography and a consistent color scheme.\n\n*Fixed navigation bar for seamless scrolling between sections.\n\n*Smooth section transitions to enhance the browsing experience.\n## 2. Interactive Services Section\nVisually engaging service cards that respond to hover and click events.\nClicking on a service card redirects the user to a dedicated page for that service (e.g., consulting.html, marketing.html).\nEach card features a short description and subtle background overlays for visual depth.\n## 3. Hero & About Sections\nEye-catching hero section with a bold headline and CTA (Call to Action) button.\nBrief “About Us” section explaining the business focus and values.\n## 4. Responsive Contact Form\nSimple and effective contact form with name, email, and message fields.\nJavaScript handles basic form submission and displays a user-friendly alert.\n## 5. Mobile-First Design\nOptimized layout for phones and tablets.\nResponsive breakpoints ensure clean stacking of cards and navigation for smaller screens.\n### Example Use Case:\nA user visits the landing page and is interested in digital solutions. They click on the "Software Development" service card and are redirected to a new page with more details:\n\n“ Tailored software to transform your workflow and boost productivity.”\n\n',

      tech: 'WEB',
      domaineId: 2,
    },
    {
      id: 22,
      name: 'Business Task Management Tool',
      number: 162,
      points: 470,
      description:
        '# Description:\n\nThis lightweight yet powerful task management web app is designed for business teams to organize their daily operations efficiently. It provides users with a simple interface to manage tasks—adding, editing, marking as complete, and deleting. Built entirely with HTML, CSS, and JavaScript, the app offers a clean and responsive UI, making it perfect for small teams or startups looking for a no-login, fast-access productivity solution.\n\n# Key Features of the Project:\n## 1. User-Friendly Task Interface\nMinimalist and intuitive layout that enables users to manage their tasks with ease.\nClearly separated sections for pending and completed tasks.\n## 2. Task Creation and Editing\nUsers can quickly add new tasks via an input field and button.\nInline editing allows for fast changes without reloading or popups.\n## 3. Task Status Toggle\nTasks can be marked as complete or reverted back to pending with a single click.\nVisual cues (e.g., strikethroughs or color changes) indicate task status instantly.\n## 4. Task Deletion\nEach task includes a delete button for removing unnecessary or completed items.\nReal-time updates ensure a dynamic user experience with no page reloads.\n## 5. Stylish and Responsive UI\nCSS styles add modern touches such as hover effects, spacing, shadows, and animations.\nFully responsive layout that adjusts beautifully across desktops, tablets, and smartphones.\n### Example Use Case:\nA project manager at a startup uses the tool to assign and track tasks for the marketing team. After adding a task “Prepare campaign presentation,” they later mark it as complete:\n\n“ Prepare campaign presentation – Completed and archived successfully.”',

      tech: 'WEB',
      domaineId: 2,
    },
    {
      id: 23,
      name: 'Football Recruitment & Player Performance Tracker',
      number: 163,
      points: 580,
      description:
        '# Objective:\nA simple, efficient dashboard for football scouts and club managers to:\n\n1. Track player performance in real-time\n\n2. Compare potential signings\n\n3.Monitor squad fitness & form\n\n# Core Screens:\n## 1. Player Profile Overview\nPlayer info, key stats, fitness status, and recent form graph in a card-based layout.\n\n## 2. Player Comparison Tool\nSide-by-side view with performance and market value comparison. Includes a summary report.\n\n## 3. Live Match Tracker\nReal-time feed with match events, player movement, and fitness data.\n\n## 4. Squad Management View\nFull squad list with filters for position, fitness, and training load. Alerts for injuries and fatigue.\n\n### Example Scenario:\nA scout compares two strikers under €20M. One shows better form and stable value. Live match feed confirms recent goal. Report suggests signing that player.\n\n',

      tech: 'UI_UX',
      domaineId: 3,
    },
    {
      id: 24,
      name: 'Interactive Destination Explorer',
      number: 164,
      points: 450,
      description:
        "# Objective:\nDesign a sleek and engaging interface that allows users to explore global travel destinations through interactive visuals and insights.\n\n# Core Screens:\n## 1. Interactive World Map\nClickable map pins representing cities or landmarks. Clicking reveals location details, photos, and quick facts.\n\n## 2. Destination Profile Page\nHighlights must-see places, local tips, budget estimates, and weather info. Includes a simple photo carousel and save-to-wishlist button.\n\n## 3. Travel Wishlist View\nUser's saved destinations displayed as cards. Each card shows travel status (planned, booked, visited) and estimated cost.\n\n## 4. Travel Quiz or Inspiration Tool\nA short quiz or filter system that suggests destinations based on mood, interests, or season.\n\n### Example Scenario:\nA user clicks on a pin for Kyoto. The profile page shows cherry blossom season tips, local food, and a photo gallery. They save it to their wishlist and take a quiz to discover more places that match their interests.",
      tech: 'UI_UX',
      domaineId: 4,
    },
    {
      id: 25,
      name: 'Travel Price Comparison and Booking App',
      number: 102,
      points: 700,
      description:
        'Objective:\n\nCreate a mobile application that allows users to compare travel prices (flights, hotels, and car rentals) across multiple providers. The app should display the best available options and allow users to book directly through a partner API. The application will be developed using Flutter for the front-end and Express.js for the back-end to handle API integrations, user authentication, and booking management.\n\nKey Features:\n\n   - Flight Search: Allow users to search for flights by destination, date, and class (economy, business, etc.).\n\n   - Hotel Search: Integrate with hotel booking APIs to show available rooms based on user preferences.\n\n   - Car Rental Search: Provide options for car rentals, including filtering by type and rental agency.\n\n   - Price Comparison: Compare prices from multiple service providers and display the best deals.\n\n  - Booking Integration: Enable users to book flights, hotels, and cars directly through the app by integrating booking services (e.g., Expedia API, Skyscanner API).\n\n - Booking History: Users can view their past bookings and track their travel plans.',

      tech: 'MOBILE',
      domaineId: 4,
    },
    {
      id: 26,
      name: 'Social Travel Network',
      number: 103,
      points: 650,
      description:
        '- Objective:\n\nCreate a social platform for travelers where users can share their travel experiences, photos, and recommendations. The app should allow users to interact with each other by following, commenting, and messaging other travelers. The application will be built using Flutter for the front-end, providing a rich, interactive user experience, and Express.js for the back-end, which will manage user data, posts, comments, and interactions.\n\n **Key Features**:\n * **User Profiles**: Allow travelers to create profiles with their personal travel stories, photos, and recommendations.\n * **Photo Sharing**: Users can upload and share their travel photos with the community.\n * **Travel Journals**: Create a feature where users can post detailed travel journals with text and media. \n* **Social Interactions**: Allow users to follow others, comment on posts, and like content. \n* **Travel Recommendations**: Implement a system for users to recommend destinations, activities, and travel tips.\n* **Messaging System**: Add direct messaging functionality for private conversations between travelers.”\n\n\n',
      tech: 'MOBILE',
      domaineId: 4,
    },
    {
      id: 27,
      name: 'Trip Tinder UI/UX',
      number: 551,
      points: 250,
      description:
        '**Description**\n\nCreate the UI/UX design of an intuitive mobile application that helps travelers find reliable and compatible travel companions, using a simple matching system, inspired by Tinder.\n\n**Main screens**\n1. Swipe screen (like Tinder):\n        \n    . Photo + first name + age.\n    \n    . Like (❤️) and Pass (✖️) buttons.\n\n2. Match screen\n    \n    . Photo + automatic message: "It\'s a match! Start chatting now."\n\n    . Button: "Send a message" (opens the chat)\n3. Chat screen.\n\n    . Exchange text messages.\n\n    . Add emojis (👍, ✈️).\n\n    . Simple chat bubbles (blue for you, gray for the other).\n\n**Tools Used**   \n       \n. **Figma**:  For UI/UX design, interactive prototypes, and screen navigation.\n\n. **Icons and emojis**: For fun and universal communication.\n\n\n\n\n\n\n',

      tech: 'UI_UX',
      domaineId: 4,
    },
    {
      id: 28,
      name: 'Daily life evaluator',
      number: 351,
      points: 250,
      description:
        "Introduction:\n\nMental health can be a serious issue, if not checked regularly things can get out of control and venting can be the best way to deal with it, so in order to benefit from useful tools such as diaries while avoiding their negative aspects (replacing therapy with a diary / a diary being a place for developing negative emotions...), we've come up with a concept for a website that could improve many lives:\n\n\nChallenge:\n\nCreate a website in ReactJS that:\n\n\nPart 1:\n\nKeeps track of a person's diary entries and then, at the end of the entry, asks them 2 specific questions that are mandatory (required):\n\n1- What is your mood today?\n\nvery happy / happy / indifferent / sad / very sad\n\n2- Did you achieve a small victory (good deed) today? if so, please write it down!\n\n\nPart 2:\n\nHas dashboard where it contains:\n\nThe list of entries sorted by their creation date, these entries need to be collapsed for user experience and then the user can read more of them if needed.\n\nA counter of small victories achieved during the period that the diary has been used for, and an overall mood evaluator that can give recommendations based on different situations.\n\n\nPart 3:\n\nWhen the user clicks on the number of small victories counter, they are taken to a page where they can see a list of all the good deeds they have done and on which days, to remind them that they are a helpful bunch.\n\n\nYou are allowed to use JSON files as your database.\nTODO: Add images later",

      tech: 'WEB',
      domaineId: 3,
    },
    {
      id: 29,
      name: 'Library modernization',
      number: 352,
      points: 250,
      description:
        "Introduction:\n\nHello, I'm a librarian, and business has not been the same, since the revolution of the internet, I have been brainstorming an idea on how to keep the ball rolling and the cash flowing, but I failed on every attempt, in the end, when you can't beat them, join them!\n\n\nChallenge:\n\nSo you are tasked to make a website design using something called ReactJS of my personal collection of books, this task will be a simple proof of concept (without features such as payment and accounts) to test the design, and the design will contain the elements as follows:\n\nPart 1:\n\n    A header showing my beautiful library logo\n    A search bar so that people can find the books they want!\n    A grid containing books!\n    And a side list showing the best sellers / popular books.\n\n\nBut that's not all, I also need you to implement the interface of when a user reads a book and it will have the elements as follows:\n\nPart 2:\n\n    That beautiful header must be present.\n    A page with a limited size (it must be the same size of a A4 page no matter what resolution it has), with two buttons for next/previous page (The book (to test) must be a huge file of a markdown, that also means that special md formatting like **this** will be rendered to the ui as this)\n\n\nPart 1: My work of art (I dreamed of becoming a painter one day, but fate made me a librarian instead)\n\n\nPart 2: I love reading books!\n\n\nYou are always welcome to make my website eye-candy, that attracts more users and with more users, my business will be saved!\n\ntodo add pictures",

      tech: 'WEB',
      domaineId: 1,
    },
    {
      id: 30,
      name: 'Survey Framework',
      number: 353,
      points: 250,
      description:
        'Introduction:\n\nGenerating surveys on the front end can be quite tedious and cumbersome, so a group of front end engineers decided to create a small framework to generate surveys on the fly without rewriting any code and without relying on companies to host their surveys.\n\n\nChallenge:\n\nWrite a small project in ReactJS that:\n\n\nPart 1:\n\n    Creates a JSON file based on the options given to it using the most common fields: radio buttons, text area, dates, check boxes, input fields...\n\n\n    Rearranges (select an available element and then click on an up/down arrow for example) as well as modifies a selected element within the survey on the fly.\n\n\n    Deletes a selected survey element and also provides a clear all button (a warning about deletion is optional)\n\n\nNote:\n\n    If the choice is radio/checkbox, an additional field must appear allowing you to create separate checkbox / radio options.\n\n\n    Every object must have a question, and a type of input accompanying it.\n\n\nPart 2:\n\n    There must be a JSON code generated on every change made to the survey so that it can be dynamically imported / exported, the JSON can be also modified manually for quicker, and dirtier edits.\n\n\nPicture: What the site may look like (Also to make it easier to understand)\n\ntodo: Add pictures',

      tech: 'WEB',
      domaineId: 2,
    },
    {
      id: 31,
      name: 'Quick Chart Generator',
      number: 354,
      points: 250,
      description:
        "Introduction:\nHello, I'm a research scientist and I work quite a lot with data and datasheets, and I find it quite tedious to get charts (chart types) from my csv files, can you please do something about it?\n\nChallenge:\n\n    You are assigned to create a project, in ReactJS, about a chart generator,\n    Its simple in concept, but can be quite tedious to implement (you need csv parser / recharts libraries)\n    The website you are making needs to have a button to input the csv file, this csv file is then parsed into a JSON file to be easily read and understood by JavaScript, the JSON File gets shown in a table and then converted into a chart of a type chosen by the user (bar chart / pie chart / graph....).\n    We can hide the table, making for a better view of the chart, if the user desires.\n\nExample:\nA mock up of a quick chart generator\n\nTODO: add images\n\n",

      tech: 'WEB',
      domaineId: 2,
    },
    {
      id: 32,
      name: "A Blogger's World!",
      number: 355,
      points: 250,
      description:
        "Introduction:\n\nHello! I'm the famous YouTuber Laup del Nagol, and I'm going to vlog my journey around the world in 365 days. I'm going to visit every country and post every part of my adventure. I need a specialized website for that.\n\nAnd that's where you come in, buddy! I need you to make a website for me so I can document my journeys in ReactJS.\n\nI will pay you in ooz coins.\n\nTask:\n\nThe website will feature a home page with my exploits. The page should include a title, description, and picture taken during the journey. When the user clicks on the picture, a blog about that journey should load. Additional pictures and videos about the blog should be included. full comment section, where users can interact with likes (and have the dislike button there, but don't do anything), comments are secretly filtered upon submission to reject the ones including some words like \"scammer / just put the fries in the bag bro / Laup del Ekaj...\", and you are tasked to do a proof of concept using that Jason as your database, bro. I will pay you, so don't ever think about saying I'm bad or I'll sue you and tell my brother to fight your grandpa in the ring.\n\n\n    My Vlog Website\n\n2 the content of the vlog alongside the comment section\n\nTODO: Add images",

      tech: 'WEB',
      domaineId: 4,
    },
    {
      id: 33,
      name: 'Project Management App for Teams',
      number: 2,
      points: 700,
      description:
        '### **📱 Project Management App for Teams**\n\n#### 📌 *Overview*  \nA ** mobile app** built with **Flutter** to help teams **plan, track, and manage projects** in real time. Features include **task assignments**, **progress tracking**, **file sharing**, and **team chat**—all in one place.\n\n---\n\n### 🎯 *Key Features*\n\n#### 1️⃣ **Task Management**  \nCreate, assign, and prioritize tasks with deadlines.\n\n- **Kanban boards** (To-Do / In Progress / Done)  \n- **Due date reminders** (push notifications)  \n\n#### 2️⃣ **Team Collaboration**\n\n- **Task sharing**  \n- **File sharing** (upload docs, images, links)  \n\n#### 3️⃣ **Cross-Platform Sync & Roles**\n\n- **Offline mode** (syncs when back online)  \n- **Real-time chat** (per project or task)  \n- **@mentions** to notify teammates  \n- **User roles**: *Admin*, *Manager*, *Member*  \n- **Private vs. Public** project visibility  \n\n',
      tech: 'MOBILE',
      domaineId: 1,
    },
    {
      id: 35,
      name: 'Code Blue Alert App',
      number: 5,
      points: 250,
      description:
        '## 🧠 **Challenge: Build a Code Blue Alert App**  \n### 💻 Tech Stack: Flutter + Firebase  \n\n---\n\n### 📱 **Goal:**  \nBuild a **simple emergency alert app** used in hospitals to notify staff during life-threatening situations like cardiac arrests (**Code Blue**).  \n\n---\n\n### 🚨 **Minimum Requirements**  \n\n#### 1. **Code Blue Trigger Screen**\n- One large **red "CODE BLUE" button**.\n- Two input fields:  \n  - Room Number (e.g., `405`)  \n  - Floor (e.g., `4`)  \n- On tap, it should:  \n  - Save the alert info (room, floor, time) to **Firestore**.  \n  - Send a **push notification** to all devices.  \n\n#### 2. **Push Notifications**\n- Use **Firebase Cloud Messaging** (FCM).  \n- Devices must receive a push notification like:  \n  > **CODE BLUE – Floor 4, Room 405**  \n\n#### 3. **Alert Log Screen**\n- Show a **list of all previous alerts** stored in Firestore:  \n  - Room  \n  - Floor  \n  - Time  \n  - Triggered by (static or auto-filled name/email)\n\n---\n\n### ⭐ Bonus (Optional)\n- Add an **Acknowledge** button to each alert.  \n- When pressed, add the user’s name + timestamp to the alert document.  \n\n---\n\n### 📦 Firebase Collections Example\n\n`alerts` Collection:\n```json\n{\n  "room": "405",\n  "floor": "4",\n  "triggeredAt": "2025-04-19T14:22:00Z",\n  "triggeredBy": "nurse.jane@example.com",\n  "acknowledgements": []\n}\n```\n\n---\n\n\n\n### 🏁 Completion Criteria:\n- ✅ Triggering a Code Blue stores data in Firestore  \n- ✅ Push notification is received on all devices  \n- ✅ Alert log screen displays correctly  \n- ✅ (Optional) Acknowledgment feature works  \n\n',
      tech: 'MOBILE',
      domaineId: 3,
    },
    {
      id: 36,
      name: 'Community Learning Paths',
      number: 6,
      points: 600,
      description:
        '\n### 📱 **Community Learning Paths:**\n\nA mobile app that connects a community of learners by allowing users to share their personal learning paths for any skill or technology. From coding and  design to marketing or even  hobbies, users can post step-by-step journeys along with the resources they used like  videos,  articles, or  courses. The app makes it easy to discover new ways to learn, get inspired, and follow in the footsteps of others. 🚀\n\n---\n\n### 🔑 **Key Features:**\n\n- 👤 **User Accounts & Profiles:** Create and manage your learning profile and track shared paths.  \n- 🛠️ **Create Learning Paths:** Add a title, description, steps, and links to useful resources (YouTube, blogs, etc.).  \n- 🔍 **Explore Feed:** Browse popular or latest paths shared by others in the community.  \n- 🏷️ **Tags & Categories:** Filter by topic or skill (e.g., Python, UI Design, Photography).  \n- 💾❤️ **Save & Like Paths:** Save learning paths to revisit them later or show appreciation.  \n- 💬 **Comment & Discuss:** Ask questions or give feedback directly on a path.  \n- ✅ **Progress Tracking:** Mark steps as completed to track your journey.  \n- 👥 **Follow Users:** Get notified when your favorite creators post new paths.\n\n',
      tech: 'MOBILE',
      domaineId: 1,
    },
    {
      id: 37,
      name: 'QuickOrder App',
      number: 7,
      points: 200,
      description:
        "### 📱 **QuickOrder App**  \n**Goal:** Build a simple mobile app that lets users send fast, pre-written product request emails to suppliers – **in less than 30 seconds**.\n\n---\n\n### 🎯 **Your Mission**  \nMake it easy for a shop owner to:  \n1. Select a supplier  \n2. Pick a few products  \n3. Choose a delivery date  \n4. Tap “Send Request” → Launches the default **email app** with a pre-filled message\n\n---\n\n### 📦 **Basic Features (Frontend-Only)**  \n✅ **Supplier List** (stored locally in the app)  \n✅ **Product Selection** (checkboxes or toggles)  \n✅ **Delivery Date Picker** (shows up in the email)  \n✅ **Send Email Button** that opens the user's email app (`mailto:` or using a plugin)\n\n\n---\n\n### 📤 **Email Format (Auto-Generated)**  \n```text\nSubject: Urgent Order Request\n\nHi Supplier A,\n\nPlease deliver:\n- 50x Screws\n- 20x Nails\n\nDelivery by: April 26, 2025  \nConfirm availability.\n\nBest,  \n[Your Name]\n```\n\n\n\n### ⭐️ **Bonus Features (If You Have Time)**  \n- Save different email templates (e.g., “Urgent”, “Monthly Restock”)  \n- Generate a **PDF** order summary (just text-based PDF)\n\n---\n\n### 🏁 **Project Done When...**  \n- You can pick a supplier, select products, choose a date, and hit **“Send Email”**  \n- The app opens the email client with a ready-to-send message  \n- All data is stored **locally**, no backend needed\n\n",
      tech: 'MOBILE',
      domaineId: 2,
    },
    {
      id: 38,
      name: 'SmartBudget',
      number: 552,
      points: 2000,
      description:
        '### **Decription**\n\nCreate the UI/UX design of an intuitive budgeting application on \n **Figma** that helps young adults easily manage their personal finances, using a simple and visual budgeting system. \n#### This application allows users to: \n. Manage their budget in a simple and visual way.\n\n. Receive automatic advice based on their spending.\n\n. Create goals (travel, savings, etc.) and track their progress.\n\n### **Requirements**:\n\n#### 1. Use Case: \nDevelop a clear and simple use case to illustrate how the user interacts with the application and how it solves their pain points.\n\n####    2. Presentation: \nCreate a detailed presentation showcasing the UI/UX design, explaining the core features of the app, the user journey, and how the design enhances the overall user experience.\n\n\n### **Key Features**\n#### \n1. Clear and Visual Dashboard:\n\n    . A quick summary of the monthly budget at the top.\n\n    . A colorful circle chart showing how much money is left.\n\n    . Simple categories (food, transport, entertainment...) with icons and small charts to show spending by category.\n\n2. Quick Expense Entry:\n\n    .  Minimalist interface with emojis to represent expenses.\n\n    . Add in just 2 taps → Amount + category.\n\n3. Financial Goals:\n\n    . Create visual goals (e.g. Trip to Barcelona 🧳 – €500).\n  \n    . Motivating progress bars.\n\n    . Notifications like: “You’ve reached 60% of your goal, great job! 🎉”.\n\n4. Smart and Supportive Tips:\n\n    .  Suggestions based on habits ("You spend a lot on delivery — how about cooking twice a week?").\n\n    . Gentle reminders, never guilt-inducing.\n\n',

      tech: 'UI_UX',
      domaineId: 2,
    },
    {
      id: 39,
      name: 'Health & Wellness Checker',
      number: 501,
      points: 200,
      description:
        'Maintaining a healthy weight is essential for overall well-being.Your task is to create a simple, user-friendly web site for a healthcare platform that helps users assess their weight status and receive personalized diet recommendations. The app will accept the user’s weight and height, calculate their Body Mass Index (BMI), and determine if their weight is under, normal, or over. Based on the result, it will suggest the best diet plan.\n\n\n\nKey Features to Implement:\n\n**1- User Input Form:**\n\nCreate a form where users can input their:\n\n- Weight (in kg or lbs)\n- Height (in cm or inches)\n\nInclude a "Calculate" button to process the data.\n\n\n\n**2- BMI Calculation:**\n\nUse the formula:\n\nBMI = weight (kg) / (height (m) * height (m))\n\n(Convert height from cm to meters if needed.)\n\nDisplay the BMI result and categorize it as:\n\n- Underweight (BMI < 18.5)\n- Normal weight (BMI 18.5–24.9)\n- Overweight (BMI ≥ 25)\n\n\n**3- Diet Recommendations:**\n\nBased on the BMI category, provide a brief diet suggestion:\n\n- **Underweight:** High-calorie, nutrient-rich foods (e.g., nuts, avocados, lean proteins).\n\n- **Normal weight:** Balanced diet with fruits, vegetables, whole grains, and proteins.\n- **Overweight:** Low-calorie, high-fiber foods (e.g., vegetables, lean meats, whole grains).\n\n\n**4- Responsive Design:**\n\n- Ensure the website works seamlessly on desktop, tablet, and mobile devices.\n\n\n\n**Bonus Features (Optional):**\n\n- Include a progress tracker for users to log their weight over time.\n- Provide additional health tips or exercise recommendations based on BMI.',
      tech: 'WEB',
      domaineId: 3,
    },
    {
      id: 41,
      name: 'Flashcards Learning Website',
      number: 502,
      points: 250,
      description:
        'Flashcards are a fantastic way to learn a new language, but a basic set can be so much more effective. You will create a truly dynamic learning experience.\n\n\n\nHere are three key upgrades to build language-learning flashcards:\n\n\n\n   **1. Interactive Flashcards:**\n\n- Create a set of flashcards with an English word on the front and its translation (e.g., French) on the back.\n- Add a flip animation when the user clicks on a card to reveal the translation.\n- Include an audio button to play the pronunciation of the translated word.\n\n\n**2. User-Friendly Design:**\n\n- Display the flashcards in a clean, grid-like layout.\n- Ensure the design is visually appealing and easy to navigate.\n\n\n**3. Responsive Design:**\n\n- Make sure the flashcards work seamlessly on desktop, tablet, and mobile devices.\n\n\n**Bonus Features (Optional):**\n\n- Include a progress indicator (e.g., "Card 1 of 10") to show how many cards are left.\n- Allow users to add their own custom flashcards.\n- Add a shuffle feature to randomize the order of the flashcards.',
      tech: 'WEB',
      domaineId: 1,
    },
    {
      id: 42,
      name: 'Home Fitness Hub',
      number: 503,
      points: 300,
      description:
        'Staying active at home has never been easier! In this challenge, you\'ll build a dynamic web application that that allows users to train from home by accessing curated playlists and videos for various sports. Each sport category will have multiple playlists and videos, complete with descriptions. Users can click on a video or playlist link to open it on YouTube. As a bonus, implement a search feature so users can quickly find the type of sport they want.\n\n\n\nKey Features to Implement:\n\n\n\n**1. Sport Categories:**\n\n- Create a homepage with different sport categories (e.g., Yoga, Cardio, Strength Training, Dance...).\n- Each category should display a list of playlists and videos.\n\n\n**2. Playlists and Videos:**\n\nFor each playlist or video, include:\n\n- A title\n- A brief description (e.g., "30-minute yoga flow for beginners")\n- A thumbnail image (optional)\n- A link to the YouTube video or playlist\n\n\nWhen the user clicks the link, it should open the video/playlist in a new tab.\n\n\n\n**3. Search Feature (Bonus):**\n\n- Add a search bar where users can type the name of a sport or activity (e.g., "yoga" or "cardio").\n- Dynamically filter and display relevant playlists and videos based on the search query.\n\n\n**4. Responsive Design:**\n\n- Ensure the website is fully responsive and works seamlessly on desktop, tablet, and mobile devices.',
      tech: 'WEB',
      domaineId: 3,
    },
    {
      id: 43,
      name: 'Budget-Friendly Travel Planner',
      number: 504,
      points: 400,
      description:
        'Planning a trip on a budget is time-consuming and frustrating. Travelers often struggle to find affordable options that match their preferences. Your task is to develop a simple, user-friendly website for a travel agency that helps clients plan and book trips based on their budget. The website should allow users to input their budget, receive personalized trip recommendations, and book their preferred trip.\n\nKey Features to Implement:\n\n\n\n**1- User Input for Budget:**\n\n- Create a clean and intuitive form where users can input their budget (in dollars or any currency).\n- Include a dropdown or input field for additional preferences (e.g., destination type: beach, mountain, city, etc.).\n\n\n**2- Trip Recommendations:**\n\nBased on the user\'s budget and preferences, display a list of trip recommendations.\n\n\n\nEach recommendation should include:\n\n- Destination name\n- Brief description\n- Estimated cost (flights, accommodation, activities)\n- A "Book Now" button\n\n\n**3- Dynamic Filtering:**\n\n- Your website must dynamically filter and display trips that fit within the user\'s budget.\n- If no trips are available within the budget, display a friendly message suggesting adjustments (e.g., "No trips found. Try increasing your budget or changing your preferences.").\n\n\n**4- Booking System:**\n\n- When a user clicks "Book Now," display a confirmation page with the trip details.\n- Include a simple form for the user to enter their contact information (name, email, phone number).\n- Show a success message after booking (e.g., "Thank you! Your trip to [Destination] has been booked.")\n\n.\n\n\n**5- Responsive Design:**\n\n- Ensure the website is fully responsive and works seamlessly on desktop, tablet, and mobile devices.\n\n\n**Bonus Features (Optional):**\n\n\n- Include images for each destination to make the website more visually appealing.\n- Add animations or transitions to enhance the user experience.\n- Add a "Favorites" feature where users can save trips they like.\n- Implement a currency converter to display trip costs in different currencies.',
      tech: 'WEB',
      domaineId: 4,
    },
    {
      id: 44,
      name: 'Learn to Code at Home',
      number: 505,
      points: 300,
      description:
        'Learning to code from home has never been easier!\n\nYour task is to create a dynamic web application that allows users to learn programming languages from home by accessing curated playlists and videos for various programming topics. Each programming language (e.g., HTML, CSS, JavaScript, React, Angular, Express.js, Python) will have multiple playlists and videos, complete with descriptions. Users can click on a video or playlist link to open it on YouTube. As a bonus, implement a search feature so users can quickly find the programming language or topic they want.\n\nKey Features to Implement:\n\n\n\n**1. Programming Language Sections:**\n\n- Create a homepage with different programming languages (e.g., HTML, CSS, JavaScript, React, Angular, Express.js, Python).\n- Each language section should display a list of playlists and videos.\n\n\n**2.Playlists and Videos:**\n\nFor each playlist or video, include:\n\n- A title\n- A brief description (e.g., "Learn HTML basics in 30 minutes")\n- A thumbnail image (optional)\n- A link to the YouTube video or playlist\n- When the user clicks the link, it should open the video/playlist in a new tab.\n\n\n\n**3.Search Feature (Bonus):**\n\n- Add a search bar where users can type the name of a programming language or topic (e.g., "JavaScript" or "React").\n- Dynamically filter and display relevant playlists and videos based on the search query.\n\n**4.Responsive Design:**\n\n- Ensure the website is fully responsive and works seamlessly on desktop, tablet, and mobile devices.\n\n\n\n**Bonus Features (Optional):**\n\n- Include a filter option to sort playlists by difficulty level (e.g., Beginner, Intermediate, Advanced).\n- Add a "Favorites" feature where users can save their preferred playlists or videos.\n- Add a progress tracker for users to log their learning progress.\n- Implement a dark mode for better user experience.',
      tech: 'WEB',
      domaineId: 1,
    },
    {
      id: 45,
      name: 'Online Course Website',
      number: 506,
      points: 399,
      description:
        'Want to create a cool online course that people actually enjoy? Static websites are great for simple stuff, but with a few tricks you can make your course way more engaging.\n\nHere\'s how:\n\n\n\n**1. Content That Appears When You Need It:**\n\nImagine your course has tons of lessons. Loading everything at once makes the page slow. Instead, load each lesson only when someone clicks on it.\n\n**- What it means:**\n\n Think of your course like a book with chapters. You don\'t read the whole book at once, right? This trick lets you load only the chapter someone wants to read, making the page super fast.\n\n\n**2. Fun and Interactive Stuff:**\n\nQuizzes are great for making learning fun! You can add cool interactive quizzes.\n\n**- What it means:**\n\n- Test users’ knowledge on course topics with multiple-choice questions.\n\n- Provide instant feedback after each question (e.g., "Correct! " or "Oops, try again!").\n\n- Calculate a final score at the end to show how well they performed.\n\n- Keep the design simple and user-friendly, ensuring it’s easy to navigate.\n\n- This quiz will make learning more engaging and help users track their progress in a fun way!\n\n\n\n**3. Works on Any Device:**\n\nPeople use phones, tablets, and computers. Your course should look great on all of them.\n\n**- What it means:**\n\n Imagine your course magically changing its size and layout to fit any screen. No more tiny text on phones or huge pictures on desktops. It just works, perfectly.\n\n\n**4. Easy to Get Around:**\n\nNobody likes getting lost. Your course should be easy to navigate.\n\n**- What it means:** \n\nImagine a clear menu, smooth transitions between lessons, and maybe even a search bar to find stuff quickly. It\'s all about making it easy for people to learn without getting frustrated.',
      tech: 'WEB',
      domaineId: 1,
    },
    {
      id: 46,
      name: 'Interactive Mathematical Reasoning Quiz Application',
      number: 401,
      points: 350,
      description:
        "Description:\nThis project is an interactive web-based quiz application designed to evaluate and enhance students' mathematical reasoning and logical thinking skills. The application presents a series of multiple-choice questions that cover various mathematical concepts, including number patterns, algebraic equations, geometry, probability, and logical puzzles. Users can answer the questions, submit their responses, and instantly receive feedback on their performance.\n\nKey Features of the Project:\n1)User-Friendly Interface :\nThe quiz is built using HTML, CSS, and JavaScript, ensuring a clean and intuitive design.\nA responsive layout allows users to take the quiz comfortably on both desktop and mobile devices.\n2)Dynamic Feedback :\nAfter submitting the quiz, users are presented with their score, which indicates the number of correct answers out of the total questions.\nThis immediate feedback helps users understand their strengths and areas for improvement.\n3)Customizable Content :\nThe quiz can be easily extended by adding more questions or modifying existing ones in the** JavaScript code**.\n4)Engaging Design :\nThe use of modern styling techniques (e.g., shadows, rounded corners, and hover effects) enhances the visual appeal of the quiz.\nThe color scheme and typography create a professional and inviting atmosphere for learners.\n5)the quiz along withe the right answer.:\n1)What is the next number in the sequence: 2, 4, 8, 16, 32, ___?\n48\n64 (True)\n52\n72\n2)If x+3=7, what is the value of x?\n3\n5\n10\n4 (True)\n3)If the perimeter of a square is 20 cm, what is the length of one side?\n10 cm\n5 cm (True)\n4 cm\n8 cm\n4)A bag contains 5 red balls and 3 blue balls. What is the probability of randomly picking a red ball?\n2/1\n8/5(True)\n8/3\n3/2\n5)John is twice as old as Mary. If John is 24 years old, how old will Mary be in 5 years?\n12\n17 (True)\n29\n14\n6)The length of a rectangle is 8 cm, and its width is 5 cm. What is its area?\n13 cm²\n40 cm² (True)\n18 cm²\n24 cm²\n7)A train travels 300 km in 5 hours. What is its average speed?\n50 km/h\n60 km/h(true)\n70 km/h\n80 km/h\n8)What is the smallest prime number greater than 20?\n21(trye)\n23\n25\n27\n9)What is the sum of the angles in a triangle?\n90°\n180° (True)\n270°\n360°\n10)What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...?\n\ufeff10\n11\n13 (True)\n15",
      tech: 'WEB',
      domaineId: 1,
    },
    {
      id: 47,
      name: 'HealthTech Dashboard – Daily Step Tracker',
      number: 402,
      points: 400,
      description:
        'The HealthTech Dashboard is a simple yet interactive web application that allows users to track and visualize their daily step count. Designed with user experience in mind, it combines clean UI, live data input, and dynamic charting to encourage consistent physical activity and promote healthy living.\n\n🔧 Key Features\n📊 Interactive Charting\nUtilizes Chart.js to render a responsive line chart that updates in real time as users enter their step data.\n\n🗓️ Daily Step Input\nA form where users can easily input the number of steps they walked on a given date.\n\n💾 In-Memory Data Handling\nStep data is stored in a local JavaScript array and rendered instantly without needing a page refresh.\n\n🎨 Responsive & Clean Design\nStyled with modern CSS to provide a sleek and intuitive layout that looks great on both desktop and mobile.\n\n🧠 How It Works\nThe user enters a date and step count using the form.\n\nUpon submission:\n\nThe date is added to the chart labels.\n\nThe step count is added to the dataset(Object).\n\nThe chart updates immediately to reflect the new data.\n\nThe interface resets the form to prepare for the next input',

      tech: 'WEB',
      domaineId: 3,
    },
    {
      id: 48,
      name: 'Public Transport Guide',
      number: 8,
      points: 400,
      description:
        "### **Public Transport Guide App**  \n\n**Tech Stack:** Flutter or React Native  \n\n---\n\n### **Story: \"City Explorer – Never Get Lost Again!\"**  \nImagine you're a tourist visiting **New York City** (or any major city) for the first time. The subway and bus systems seem overwhelming—different lines, confusing transfers, and no idea which stop is closest to your hotel.  \n\nYour task is to build a **Public Transport Guide App** that helps travelers navigate the city easily. The app will display metro/bus routes, stops, and key information—so even first-time visitors can travel like locals!  \n\n---\n\n### **Features to Implement (MVP)**  \n1. **Route List Screen**  \n   - Display hardcoded metro/bus lines (e.g., \"Subway Line 1 – Red Line\").  \n   - Show stops for each route (e.g., \"Times Square\", \"Central Park\").  \n\n2. **Search Functionality**  \n   - Users can type a station name (e.g., \"Grand Central\") and see which lines pass through it.  \n\n3. **Basic UI**  \n   - Clean list view with route colors/icons (e.g., red for Line 1, blue for Line 2).  \n   - Simple navigation between screens.  \n\n---\n\n### **Bonus Challenge (If Time Permits)**  \n- **Map View**: Show routes on an interactive map (Google Maps API).  \n- **Favorites**: Let users save frequently used stations.  \n- **Real-Time Updates (Mock)**: Add a \"Next Train in 5 min\" indicator.  \n\n\n### **Example Hardcoded Data (For NYC Subway)**  \n```dart\nfinal routes = [\n  {\n    'name': 'Line 1 – Red',\n    'stops': ['South Ferry', 'Times Square', 'Columbus Circle'],\n  },\n  {\n    'name': 'Line A – Blue',\n    'stops': ['Brooklyn Bridge', 'West 4th St', 'Central Park'],\n  },\n];\n```\n",

      tech: 'MOBILE',
      domaineId: 4,
    },
  ];

  // Mapper les données JSON aux champs du modèle Challenge
  const challengesData = jsonData.map((item) => ({
    name: item.name,
    domaineId: item.domaineId,
    description: item.description,
    points: item.points,
    number: item.number,
    tech: Tech[item.tech as keyof typeof Tech],
  }));

  return prisma.challenge.createMany({
    data: challengesData,
  });
}

async function main() {
  //await seedWorkshops();
  //await seedFacs();
  //await seedDomaines();
  await seedChallenges();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
