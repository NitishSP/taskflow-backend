# TaskFlow Frontend - Production-Level React TypeScript Application

## 🎯 Project Overview
Build a **production-ready, enterprise-grade** task management frontend application using React, TypeScript, Redux Toolkit, and React Query. This is a full-stack MERN application showcasing modern development practices suitable for portfolio and job applications.

---

## 🏗️ Technical Stack

### Core Technologies
- **React 18+** with TypeScript
- **Vite** - Build tool for faster development
- **Redux Toolkit** - State management
- **React Query (TanStack Query)** - Server state management & API caching
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Component library
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Zod** - Runtime type validation & form schemas
- **React Hot Toast** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files
- **TypeScript** - Type safety

### Testing (Optional but Recommended)
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **MSW (Mock Service Worker)** - API mocking

---

## 📁 Folder Structure

```
taskflow-frontend/
├── public/
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── api/                    # API client & endpoints
│   │   ├── axios.config.ts
│   │   ├── endpoints/
│   │   │   ├── auth.api.ts
│   │   │   └── tasks.api.ts
│   │   └── types/
│   │       ├── auth.types.ts
│   │       └── task.types.ts
│   │
│   ├── components/             # Reusable components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Spinner.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AppLayout.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── tasks/
│   │       ├── TaskCard.tsx
│   │       ├── TaskList.tsx
│   │       ├── TaskForm.tsx
│   │       ├── TaskFilters.tsx
│   │       ├── TaskStats.tsx
│   │       └── TaskModal.tsx
│   │
│   ├── features/               # Feature-based modules
│   │   ├── auth/
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useLogin.ts
│   │   │   │   ├── useRegister.ts
│   │   │   │   └── useLogout.ts
│   │   │   ├── store/
│   │   │   │   └── authSlice.ts
│   │   │   └── utils/
│   │   │       └── tokenManager.ts
│   │   │
│   │   └── tasks/
│   │       ├── hooks/
│   │       │   ├── useTasks.ts
│   │       │   ├── useCreateTask.ts
│   │       │   ├── useUpdateTask.ts
│   │       │   └── useDeleteTask.ts
│   │       └── store/
│   │           └── tasksSlice.ts
│   │
│   ├── hooks/                  # Global custom hooks
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useClickOutside.ts
│   │
│   ├── layouts/                # Page layouts
│   │   ├── AuthLayout.tsx
│   │   └── DashboardLayout.tsx
│   │
│   ├── pages/                  # Route pages
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardPage.tsx
│   │   ├── tasks/
│   │   │   ├── TasksPage.tsx
│   │   │   └── TaskDetailPage.tsx
│   │   ├── profile/
│   │   │   └── ProfilePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   └── index.ts
│   │
│   ├── routes/                 # Route configuration
│   │   ├── AppRoutes.tsx
│   │   └── routes.config.ts
│   │
│   ├── store/                  # Redux store
│   │   ├── index.ts
│   │   ├── rootReducer.ts
│   │   └── hooks.ts            # Typed useDispatch & useSelector
│   │
│   ├── styles/                 # Global styles
│   │   ├── globals.css
│   │   └── themes/
│   │       └── theme.config.ts
│   │
│   ├── utils/                  # Utility functions
│   │   ├── formatDate.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env.development
├── .env.production
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 🔑 Core Features to Implement

### 1. Authentication System
**Pages:**
- Login page with email/password
- Register page with validation
- Password strength indicator
- Remember me functionality
- Auto-login with refresh token

**Features:**
- JWT token management (access + refresh tokens)
- Automatic token refresh before expiration
- Secure token storage (httpOnly cookies preferred)
- Protected routes with authentication checks
- Auto-logout on token expiration
- Redirect to intended page after login

**Redux State:**
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

---

### 2. Task Management (CRUD Operations)

**Pages:**
- Dashboard with task overview & statistics
- Tasks list page with filters/search
- Task detail/edit modal
- Create task modal/page

**Features:**

#### Task List
- Display all tasks in card/list view
- Real-time updates with React Query
- Infinite scroll or pagination
- Empty state illustrations

#### Task Filters
- Filter by status: `todo`, `in-progress`, `done`
- Filter by priority: `low`, `medium`, `high`
- Filter by due date (overdue, today, this week, etc.)
- Search by title/description
- Sort by: created date, due date, priority

#### Task CRUD
- **Create:** Modal/form with validation
- **Read:** View task details
- **Update:** Edit task inline or in modal
- **Delete:** Confirmation dialog before deletion

#### Task Card/Item Display
- Title, description (truncated)
- Status badge (colored)
- Priority indicator
- Due date with visual indicators (red if overdue)
- Created date
- Quick actions: Edit, Delete, Change Status

**React Query Hooks:**
```typescript
// Fetch all tasks with filters
useTasks(filters?: TaskFilters)

// Get single task
useTask(taskId: string)

// Mutations
useCreateTask()
useUpdateTask()
useDeleteTask()
```

---

### 3. Dashboard & Analytics

**Components:**
- Task statistics cards:
  - Total tasks
  - Completed tasks
  - In-progress tasks
  - Overdue tasks
- Recent tasks list
- Priority distribution chart (optional: Chart.js or Recharts)
- Productivity metrics

---

### 4. User Profile

**Features:**
- View user information
- Edit profile (name, email)
- Change password functionality
- Profile avatar upload (optional)
- Account statistics

---

## 🎨 UI/UX Requirements

### Design Principles
1. **Clean & Modern:** Minimalist interface, whitespace, modern typography
2. **Responsive:** Mobile-first design, works on all screen sizes
3. **Accessible:** ARIA labels, keyboard navigation, screen reader support
4. **Fast:** Optimistic updates, skeleton loaders, lazy loading
5. **Intuitive:** Clear CTAs, helpful error messages, loading states

### Theme
- Light/Dark mode toggle
- Consistent color palette:
  - Primary: Blue (#3B82F6)
  - Success: Green (#10B981)
  - Warning: Yellow (#F59E0B)
  - Danger: Red (#EF4444)
  - Status colors for todo/in-progress/done
  - Priority colors for low/medium/high

### Animations
- Smooth page transitions
- Hover effects on cards/buttons
- Modal enter/exit animations
- Loading skeletons
- Toast notifications slide-in

---

## 🔧 Technical Implementation Details

### 1. Axios Configuration with Interceptors

**File:** `src/api/axios.config.ts`

```typescript
import axios from 'axios';
import { store } from '../store';
import { logout, setAccessToken } from '../features/auth/store/authSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Update token in Redux
        store.dispatch(setAccessToken(data.accessToken));

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

---

### 2. Redux Toolkit Setup

**File:** `src/store/index.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import tasksReducer from '../features/tasks/store/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**File:** `src/store/hooks.ts`

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

### 3. React Query Setup

**File:** `src/main.tsx`

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from './store';
import App from './App';
import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
```

---

### 4. TypeScript Types

**File:** `src/api/types/task.types.ts`

```typescript
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}

export interface UpdateTaskDTO extends Partial<CreateTaskDTO> {}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
  sortBy?: 'createdAt' | 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc';
}
```

**File:** `src/api/types/auth.types.ts`

```typescript
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: User;
}
```

---

### 5. React Query Hooks Example

**File:** `src/features/tasks/hooks/useTasks.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../../../api/endpoints/tasks.api';
import { TaskFilters } from '../../../api/types/task.types';

export const useTasks = (filters?: TaskFilters) => {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => getTasks(filters),
    select: (data) => data.data.tasks,
  });
};
```

**File:** `src/features/tasks/hooks/useCreateTask.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../../../api/endpoints/tasks.api';
import { CreateTaskDTO } from '../../../api/types/task.types';
import toast from 'react-hot-toast';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskData: CreateTaskDTO) => createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create task');
    },
  });
};
```

---

### 6. Protected Route Component

**File:** `src/components/auth/ProtectedRoute.tsx`

```typescript
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Spinner } from '../ui/Spinner';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
```

---

### 7. Form Validation with Zod

**File:** `src/utils/validators.ts`

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['todo', 'in-progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.string().optional(),
});
```

---

## 🚀 Performance Optimizations

1. **Code Splitting:** Use React.lazy() for route-based code splitting
2. **Memoization:** Use React.memo, useMemo, useCallback where appropriate
3. **Virtual Lists:** For long task lists, use react-window or react-virtual
4. **Image Optimization:** Lazy load images, use WebP format
5. **Bundle Size:** Analyze with vite-bundle-visualizer
6. **Caching:** Leverage React Query's cache effectively
7. **Debouncing:** Debounce search inputs
8. **Optimistic Updates:** Update UI before API confirms

---

## 📱 Responsive Design Breakpoints

```css
/* Mobile: 0-640px */
/* Tablet: 641px-1024px */
/* Desktop: 1025px+ */

/* Tailwind breakpoints */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 🔒 Security Best Practices

1. **XSS Prevention:** Sanitize user inputs, use React's built-in escaping
2. **CSRF Protection:** Use httpOnly cookies for refresh tokens
3. **Secure Storage:** Never store tokens in localStorage (use httpOnly cookies)
4. **Environment Variables:** Keep API URLs and sensitive data in .env
5. **Input Validation:** Validate all user inputs client-side and server-side
6. **HTTPS Only:** Ensure production uses HTTPS
7. **Content Security Policy:** Implement CSP headers

---

## 🧪 Testing Strategy

1. **Unit Tests:** Test utility functions, custom hooks
2. **Component Tests:** Test UI components in isolation
3. **Integration Tests:** Test feature workflows
4. **E2E Tests:** (Optional) Use Playwright or Cypress

---

## 📦 Environment Variables

**File:** `.env.development`

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=TaskFlow
```

**File:** `.env.production`

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
VITE_APP_NAME=TaskFlow
```

---

## 🎯 Key Features for Job Portfolio

### Must-Have Features
1. ✅ Complete authentication flow with JWT
2. ✅ CRUD operations for tasks
3. ✅ Advanced filtering and search
4. ✅ Responsive design (mobile-first)
5. ✅ Error handling and loading states
6. ✅ Form validation
7. ✅ State management with Redux Toolkit
8. ✅ API caching with React Query
9. ✅ TypeScript throughout
10. ✅ Clean, organized code structure

### Nice-to-Have Features (Showcase Advanced Skills)
1. 🔥 Dark mode toggle with persistence
2. 🔥 Drag-and-drop task reordering
3. 🔥 Export tasks to CSV/PDF
4. 🔥 Task templates
5. 🔥 Tags/categories for tasks
6. 🔥 Keyboard shortcuts
7. 🔥 Offline support with PWA
8. 🔥 Email notifications (backend required)
9. 🔥 Activity/audit log
10. 🔥 Data visualization (charts)

---

## 📝 Git Commit Message Convention

Use conventional commits:

```
feat: Add task filtering functionality
fix: Resolve token refresh infinite loop
style: Update button hover states
refactor: Simplify auth hook logic
docs: Update README with setup instructions
test: Add tests for task form validation
chore: Update dependencies
```

---

## 🎓 Learning Outcomes

By completing this project, you'll demonstrate:

1. **React Ecosystem Mastery:** Hooks, Context, Router, Performance
2. **TypeScript Proficiency:** Types, Interfaces, Generics
3. **State Management:** Redux Toolkit best practices
4. **API Integration:** React Query, Axios interceptors, error handling
5. **Modern Tooling:** Vite, ESLint, Prettier, Husky
6. **UI/UX Skills:** Responsive design, accessibility, animations
7. **Production Readiness:** Security, optimization, error boundaries
8. **Clean Code:** SOLID principles, DRY, separation of concerns
9. **Testing:** Unit, integration, component testing
10. **DevOps:** Environment management, build optimization

---

## 🚢 Deployment Checklist

### Before Deployment
- [ ] Environment variables configured
- [ ] Build optimization completed
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings fixed
- [ ] Responsive design tested
- [ ] Cross-browser compatibility checked
- [ ] Performance audit passed (Lighthouse)
- [ ] Security audit completed
- [ ] Error tracking setup (Sentry)
- [ ] Analytics setup (Google Analytics)

### Deployment Platforms
- **Vercel** (Recommended for React/Vite)
- **Netlify**
- **AWS Amplify**
- **GitHub Pages**
- **Railway**

---

## 📚 Documentation Requirements

### README.md Should Include:
1. Project description and features
2. Tech stack
3. Prerequisites
4. Installation steps
5. Environment variables
6. Running the app
7. Building for production
8. Project structure
9. API endpoints used
10. Screenshots/GIFs
11. Future enhancements
12. Contributing guidelines
13. License

---

## 🎨 Design Resources

### Inspiration
- [Dribbble](https://dribbble.com/search/task-management)
- [Behance](https://www.behance.net/search/projects?search=task+manager)
- [Awwwards](https://www.awwwards.com/)

### UI Components
- [Shadcn/ui](https://ui.shadcn.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Headless UI](https://headlessui.com/)

### Icons
- [Heroicons](https://heroicons.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 🏁 Getting Started Command

```bash
# Create Vite project with React + TypeScript
npm create vite@latest taskflow-frontend -- --template react-ts

cd taskflow-frontend

# Install dependencies
npm install

# Install additional packages
npm install @reduxjs/toolkit react-redux @tanstack/react-query axios react-router-dom react-hook-form zod @hookform/resolvers react-hot-toast framer-motion date-fns

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install dev dependencies
npm install -D @types/node eslint-config-prettier eslint-plugin-prettier prettier husky lint-staged

# Start development server
npm run dev
```

---

## 🎤 Interview Talking Points

When presenting this project in interviews:

1. **Architecture Decisions:**
   - Why Redux Toolkit + React Query combo?
   - How did you structure the codebase for scalability?
   - Explain the separation of concerns

2. **Performance:**
   - What optimizations did you implement?
   - How do you handle large lists of tasks?
   - Caching strategy with React Query

3. **Security:**
   - How do you handle authentication?
   - Token refresh mechanism
   - XSS/CSRF protection

4. **User Experience:**
   - Loading and error states
   - Optimistic updates
   - Accessibility considerations

5. **Testing:**
   - What would you test?
   - Testing strategy for critical flows

6. **Scalability:**
   - How would this scale to 1000+ tasks?
   - What would you change for a larger team?

---

## 🎯 Success Metrics

Your frontend is production-ready when:

- ✅ All features work without bugs
- ✅ Lighthouse score > 90 on all metrics
- ✅ No TypeScript errors or ESLint warnings
- ✅ Works on Chrome, Firefox, Safari, Edge
- ✅ Responsive on mobile, tablet, desktop
- ✅ Loading time < 3 seconds
- ✅ API error handling is comprehensive
- ✅ Forms have proper validation
- ✅ Code is well-documented
- ✅ Git history is clean and meaningful

---

## 📞 Final Notes

This is a **production-level** application that demonstrates:
- Modern React development practices
- TypeScript proficiency
- State management expertise
- API integration skills
- UI/UX sensibility
- Performance consciousness
- Security awareness

**Remember:** Quality over quantity. A well-built, fully-functional application with great UX will impress more than a feature-bloated buggy app.

Good luck with your job search! 🚀

---

## 🔗 Backend API Reference

### Base URL
```
http://localhost:3000/api/v1
```

### Auth Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/profile` - Get user profile (Protected)

### Task Endpoints (All Protected)
- `GET /tasks` - Get all tasks (supports query params for filtering)
- `POST /tasks` - Create new task
- `GET /tasks/:id` - Get single task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Request/Response Examples

#### Login
```typescript
// Request
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "message": "Login successful",
  "accessToken": "eyJhbGc...",
  "user": {
    "_id": "123",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

#### Create Task
```typescript
// Request
POST /tasks
Authorization: Bearer <accessToken>
{
  "title": "Complete project",
  "description": "Finish the TaskFlow frontend",
  "priority": "high",
  "status": "in-progress",
  "dueDate": "2025-10-30"
}

// Response
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "456",
    "title": "Complete project",
    "description": "Finish the TaskFlow frontend",
    "priority": "high",
    "status": "in-progress",
    "dueDate": "2025-10-30",
    "createdBy": "123",
    "createdAt": "2025-10-21T10:00:00Z",
    "updatedAt": "2025-10-21T10:00:00Z"
  }
}
```

---

**Version:** 1.0  
**Created:** October 21, 2025  
**For:** TaskFlow MERN Stack Application  
**Target:** Production-level job portfolio project
