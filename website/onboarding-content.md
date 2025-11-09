# Onboarding Acknowledgments & Profile Copy

## Task 1: Onboarding Acknowledgments

### After Name
**Response:**
"Nice to meet you, {name}! I'm excited to be your sustainability buddy. Let's learn about your routine so I can give you advice that actually fits YOUR life."

---

### After Commute Method

#### Car
**Response:**
"Got it, you drive to work. No judgment here! Lots of people do. Later, we can explore ways to make your commute more sustainable when it makes sense for you."

#### Bus/Train
**Response:**
"Love it! You're already making a sustainable choice. I'll help you build on that foundation."

#### Bike
**Response:**
"Awesome! Biking is such a great way to stay active while reducing your carbon footprint. You're off to a strong start!"

#### Walk
**Response:**
"Walking to work? That's fantastic! You're already doing something amazing for both your health and the planet."

#### Work from Home
**Response:**
"Working from home eliminates your commute entirely—that's a huge win! We can focus on other areas where you can make an impact."

---

### After Commute Time

#### Morning Commute (before 9 AM)
**Response:**
"Thanks for sharing! Knowing your schedule helps me suggest actions at the right times. Morning routines are perfect for building sustainable habits."

#### Mid-Morning Commute (9 AM - 11 AM)
**Response:**
"Perfect timing noted! I'll make sure my suggestions work with your schedule and don't add stress to your day."

#### Afternoon/Evening Commute
**Response:**
"Got it! I'll keep your schedule in mind when suggesting actions. Sustainability should fit into your life, not complicate it."

---

### After Dietary Preferences

#### No Restrictions
**Response:**
"Understood! I'll suggest food-related actions that work for any diet. There are plenty of sustainable choices regardless of what you eat."

#### Vegetarian
**Response:**
"Great choice! A vegetarian diet already has a lower environmental footprint. I'll help you find even more ways to reduce your impact."

#### Vegan
**Response:**
"Amazing! A vegan lifestyle is one of the most impactful choices for the planet. I'll help you discover additional sustainability wins beyond your diet."

#### Pescatarian
**Response:**
"Nice! A pescatarian diet balances nutrition with sustainability. I'll suggest actions that complement your dietary choices."

---

### After Shopping Day

#### Saturday
**Response:**
"Weekend shopping—perfect! I'll remind you to bring reusable bags and make sustainable choices when you're out on Saturdays."

#### Sunday
**Response:**
"Sunday shopping noted! I'll help you plan sustainable shopping trips and make the most of your weekend errands."

#### Weekday
**Response:**
"Weekday shopping works! I'll suggest quick, sustainable shopping tips that fit into your busy schedule."

#### Flexible
**Response:**
"Flexible shopping schedule—that gives us lots of options! I'll suggest sustainable shopping practices you can use anytime."

---

### After Environmental Concerns

#### Climate (Carbon)
**Response:**
"Climate change is a huge concern, and I'm here to help. We'll focus on reducing your carbon footprint with actions that make a real difference."

#### Waste
**Response:**
"Waste reduction is so important! I'll help you cut down on single-use items and find creative ways to reduce, reuse, and recycle."

#### Water
**Response:**
"Water conservation matters! I'll suggest practical ways to reduce your water usage without sacrificing comfort."

#### Energy
**Response:**
"Energy efficiency is key! I'll help you find ways to reduce your energy consumption and lower both your bills and your impact."

#### All of it!
**Response:**
"You care about everything—I love that! We'll tackle sustainability from all angles. Every action counts, and together we'll make a real difference."

#### Multiple Concerns Selected
**Response:**
"Great priorities! Focusing on {concerns} gives us a clear direction. I'll suggest actions that address multiple areas at once."

---

### After Time Commitment

#### <30 min
**Response:**
"Quick wins are perfect! I'll focus on simple, fast actions that fit into your busy schedule. Small steps lead to big changes."

#### 30-60 min
**Response:**
"Moderate time commitment—that's realistic! I'll suggest actions that give you meaningful impact without overwhelming your schedule."

#### 1-2 hours
**Response:**
"An hour or two a week is great! I'll suggest more involved actions that can make a bigger impact, like meal prep or home improvements."

#### 2+ hours
**Response:**
"You're ready to dive deep! I'll suggest comprehensive sustainability actions that can transform your lifestyle. Your commitment will make a huge difference."

---

## Task 2: Profile Section Copy

### ROUTINE SUMMARY HEADER

**Header:**
"Your Daily Rhythm"

**Description:**
"I've learned your routine so I can suggest actions at the perfect moments."

---

### PREFERENCES HEADER

**Header:**
"What Works for You"

**Description:**
"These constraints help me suggest realistic actions you'll actually complete."

---

### IMPACT STATS HEADER

**Header:**
"Your Collective Impact"

**Description:**
"Small actions add up. Here's your measurable difference."

---

### ACTION HISTORY HEADER

**Header:**
"Your Journey"

**Description:**
"Every action teaches me what works for you."

---

## Additional Profile Section Copy

### Profile Overview Section

**Header:**
"Your Sustainability Profile"

**Description:**
"This is what I know about you. Update anytime to keep my suggestions relevant."

---

### AI Insights Section

**Header:**
"Personalized Insights"

**Description:**
"Based on your actions and preferences, here's what I've learned about your sustainability journey."

---

### Edit Profile Prompt

**When editing any section:**
"I'll adjust my suggestions based on your updates. What changed?"

---

### Empty State Messages

**No actions yet:**
"You haven't completed any actions yet. Start by accepting a suggestion or chatting with me!"

**No completed actions:**
"Your completed actions will appear here. Every step forward matters!"

**No active actions:**
"All caught up! Check out suggestions or chat with me for new ideas."

---

## Onboarding Completion Message

**Final Message:**
"Perfect! I've got everything I need to be your personalized sustainability coach. Let's start making a difference together! 🌱"

---

## Task 3: Demo Profile Loader Script

### DEMO PROFILE LOADER

**Purpose:** Instantly load a complete demo profile for testing and demonstrations without going through the full onboarding flow.

### Implementation Steps

#### 1. Create "Load Demo Profile" Button in Profile.jsx

**Location:** Added to the Action Buttons section at the bottom of the Profile page.

**UI Design:**
- Yellow warning banner to indicate this is for demo/testing
- Full-width button with sparkle icon
- Clear description: "Load a complete demo profile instantly for testing or demonstrations"

#### 2. On Click, Populate userProfile with Demo Data

**Demo Profile Data (Alex Chen):**

```javascript
userName: "Alex Chen"
onboardingComplete: true

routine: {
  commuteMethod: "car",
  commuteTime: "8:30 AM",
  dietType: "vegetarian",
  shoppingDay: "Saturday",
  workSchedule: "9-5"
}

preferences: {
  budget: "medium",
  timeCommitment: "moderate",
  priorities: ["carbon", "waste"]
}

history: {
  actions: [
    {
      action: "Used public transit",
      success: true,
      feedback: "Great experience!",
      impact: { co2: 15, water: 0, waste: 0 },
      date: [current timestamp]
    },
    {
      action: "Brought reusable bags to store",
      success: true,
      feedback: "Easy habit",
      impact: { co2: 5, water: 0, waste: 2 },
      date: [current timestamp]
    },
    {
      action: "Meatless Monday meal",
      success: true,
      feedback: "Delicious!",
      impact: { co2: 8, water: 50, waste: 0 },
      date: [current timestamp]
    }
  ],
  rejections: [
    {
      suggestion: "Switch to electric car",
      reason: "Too expensive for my budget",
      date: [current timestamp]
    }
  ],
  totalImpact: {
    co2: 28,  // Sum of all successful actions
    water: 50,
    waste: 2
  }
}
```

#### 3. Set onboardingComplete: true

This ensures the user won't be redirected to onboarding and can access all features immediately.

#### 4. Navigate to Home

After loading the demo profile, automatically navigate to `/home` where the user will see:
- Personalized welcome message
- Proactive suggestion (auto-generated based on demo profile)
- Dashboard with stats
- Recent activity

#### 5. Trigger Proactive Suggestion

The proactive suggestion will automatically trigger on the Home page because:
- `onboardingComplete` is true
- `showSuggestion` state is initialized to `true`
- The `ProactiveSuggestion` component auto-generates a suggestion on mount if none is provided

### Usage Instructions

1. Navigate to `/profile` page
2. Scroll to the bottom "Action Buttons" section
3. Find the yellow "Demo Mode" banner
4. Click "Load Demo Profile" button
5. Confirm the action in the dialog
6. You'll be automatically redirected to `/home`
7. The proactive suggestion will appear automatically
8. All features are now populated with Alex Chen's demo data

### Benefits

- **Instant Demo:** No need to click through 7 onboarding steps
- **Consistent Data:** Always loads the same demo profile for consistent demos
- **Full Feature Access:** All app features are immediately available
- **Realistic Data:** Demo includes actions, rejections, and impact stats
- **Testing:** Perfect for testing AI suggestions with known profile data

### Demo Profile Summary

**Alex Chen:**
- Commutes by car at 8:30 AM
- Vegetarian diet
- Shops on Saturdays
- Priorities: Carbon reduction and waste reduction
- 3 completed actions with 28 lbs CO₂ saved
- 1 rejection (electric car - too expensive)

This profile provides a realistic example that demonstrates the AI's personalization capabilities.

