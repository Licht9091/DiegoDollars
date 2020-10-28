# TODO BEFORE FRIDAY

- Only show paychecks for the current fortnight
- Set new fornight start date when starting the fortnight
- Check 'Available This Fortnight' calculation on the home screen
- My budget page state management
- Fix strings adding instead of numbers on my budget screen
- Work through suggestions from Ben's user testing
- Hide paycheck received and uncategorised expenses buttons when they don't need to be shown

- Main screen fortnight spending

  - 114%??? I think it is counting income
  - Filter by actual forntight when we have it

- Create new category API

WON'T DO:

- Find a better search bar?

- New Fortnight Total avaliable spending on modal
- Plug actual data into the fortnight summary (or not)
- Transaction code speed improvements? Maybe thinking indicators?

DONE:

- Store the start date of the current fortnight somewhere
- Home screen touchups
  - Pull down refresh?
- Find way to supress errors in Expo for demo
- Categories cards on main page should prefill the search box and search by category on the Transaction screen
- "Uncategorized Transactions" button on main screen should filter by "expenses" only and also prefill the search bar with "Uncategorized" and filter by that as a category
- My Goals page should filter by (goal.id == transaction.goalId) as well
- My Goals rocket value updates (search for EDITME)
- Update the "Not avaliable for income" on SingleTransaction to look nice (search for EDITME)
- We need a main goals page
- Finish Nav bar?
  - Highlights
  - Make sure navigation is consistent (I think done?)
  - Labels
  - 2nd Button for goals (Might need goals page first)

---

- Justin will do the Thursday screencap
- Go through and time a practice demo on thursday

Portfolio Sections:

- Project background: what is our problem and who are we trying to help? -- DARREN
- Our team -- DONE
  - Brief description of everyone's role and background/experience
- Initial research: what solutions currently exist and why are they no good?
  - YNAB requires you to categorise everything manually
  - ANZ has goals but doesn't allow you to plan a budget
  - N26 app is nice but doesn't work in australia
  - Other apps have tiring looking UIs that make bugeting a chore
  - There's massive potential for disruption in this area, there's massive potential for money to be made in this area as well
- What we set out to do: -- JORDAN FOSS
  - Things we're trying to improve over existing solutions (fun fortnightly funds)
  - Help users manage their spending habits so they can get to their saving goals faster
  - DECO3800 report and suggestions we had
  - Testing/survey that we did
- Tech Stack -- JUSTIN
  - Frontend with react native
    - Platform agnostic, android and iOS
    - Finance is a lot more secure, trustworthy and convenient on a personal device
    - Easy to move to web
  - Backend with flask
- Working process: brief summary of this semester -- JORDAN LEAN

  - Agile cycles and iterations to hone in on the perfect solution for our target market
  - We are a part of our target market and have an understanding of our users
  - Show brief prototypes of our design iterations done in XD
  - Testing and feedback gathered in studio session and through surveys/interviews

- Improvements for the future

  - Bank integration through CDR
  - Securing our database and backend
  - Biometric authentication
  - Notifications
  - Further transaction analytics

- Narrated demonstration video (covering every screen)

- Use case demonstration video (basically)
- Fairbarn films style
- Story 1: Creating a goal to buy textbooks
  - Walk through
- [3 DAYS LATER]
- Story 2: Getting paid, and allocating money into the goal
- [2 MICROSECONDS LATER]
- Story 3: Processing a transaction, allocating to goal
  - Look at their avaialble spending amount
  - Then they go to buy a textbook
  - Buy something
  - 'Tap'
  - Show transaction showing on the main screen (automatically categorised)
  - Go into the transaction and allocate it to a goal
  - Go back to the goal page to look at it

Expo:

- Problem statement (Ben will do slides and the talking for this)
- Very brief process with through a single slide
- Demo (with slides showing progression of each page/feature)
- Ask judges questions, so they think about what you're doing
- Get confirmation from judges for each thing that you're showing
- Do we need to bring a display?
- Detailed plan and practice it at least twice
- Bring a phone charger
- Deactivate phone notifications
- Bring laptop charger
- Slides with screens and people's comments from user testing

---

Work allocation:

[Jordan Foss]
-> My Goals page
-> Edit Goal
-> Delete Goal
-> Create Goal

[Jordan Lean]
-> My Budget
-> Edit budget
-> Add budget item

[Justin Robinson]
-> Transactions (Full List)
-> Income
-> Expenses
-> Home screen
-> Data from backend

[Bryley]
-> Single Transaction
-> Add to goal
-> Select Category
-> Create Category (Pop up)

[Darren Fu]
-> Button Component
-> Modal Component
-> New Paychecks Recieved
-> Fortnight Summary
-> Fortnight allocation

[Benjamin]
-> User testing interviews on XD
-> Backend touchups if needed

Other things to do:
-> Presentation format?
-> Code quality?
-> Animations?
-> Tutorial?

Individual:

- Keep track of work done each week for individual component
- Push to master

High:

- Tutorial screen progress bar blocks input field when keyboard is up
- Check through frontend fields, pop up numpad when appropriate
- Global bottom bar
- Move tutorial to registration page
- Transaction tabs
- Login page could look a little nicer
- Backend: Input validation on all endpoints
- Frontend: Input validation on all fields
- Fix transaction page loading time
- UI needs to be rescaled
- Back button on every screen
- Add transaction to fund page
- Interpretation and UX work from Ben's survey results
- Investing UX and Design
- Goal Page (Completion graph, add, edit, delete)
- User interviews

Medium:

- Popup when money received so it can directly be allocated to funds
- Backend: Spending should be calculated from transactions
- Backend: Should save the default contribution amount of each fund
- Add latest transactions segment to home screen
- Display actual available amount on homescreen
- Tutorial screen styling improvements, ammount
- Notifications design and implementation
- Weekly spending notification
- Up bank integration
- Graph on main screen
- Consistent universal animations
- Goal completion UX
- Transaction page redesign, the transactions are too tall
- Page for visualisation of bank data
- Automated expense categorisation

Low:

- Actual security

# Comments

- [AVAILABLE THIS PERIOD] "I thought it was how much money I had, or how much I have saved."
- Confusion around what is a fund: "Why do I create them? I thought you have connected with CommBank etc."

- "I don't like the categorise income, makes me feel like..."
- "I have to categorise it do I?"
- "I would [like to] categorise it"
- "It's a good thing that there's a reminder to catgorise [transactions]"

- "I like the interface, blue is really good for wisdom and finance"
- "I'm very interested in this app! It would be very useful for me."

- "You should add + to add more categories in categorise transaction page"

- Login button is not clear enough
- Some places don't have back buttons
- It would be preferred if the funds were vertically displayed
