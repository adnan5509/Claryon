import { Injectable, signal } from '@angular/core';

import { Task, type NewTaskData } from './task/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal([
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
    {
      id: 't4',
      userId: 'u2',
      title: 'Design Landing Page',
      summary: 'Create wireframes and high-fidelity designs for the landing page',
      dueDate: '2024-07-10',
    },
    {
      id: 't5',
      userId: 'u4',
      title: 'Implement CI/CD',
      summary: 'Setup continuous integration and deployment pipelines',
      dueDate: '2024-08-01',
    },
    {
      id: 't6',
      userId: 'u5',
      title: 'Database Optimization',
      summary: 'Analyze slow queries and optimize PostgreSQL performance',
      dueDate: '2024-09-15',
    },
    {
      id: 't7',
      userId: 'u6',
      title: 'Create Test Cases',
      summary: 'Write unit and integration tests for the existing services',
      dueDate: '2024-10-10',
    },
    {
      id: 't8',
      userId: 'u1',
      title: 'Publish Angular Blog Post',
      summary: 'Write and publish an educational blog post about Angular routing',
      dueDate: '2024-11-05',
    },
    {
      id: 't9',
      userId: 'u2',
      title: 'Conduct User Interviews',
      summary: 'Schedule and conduct user interviews for product feedback',
      dueDate: '2024-06-20',
    },
    {
      id: 't10',
      userId: 'u5',
      title: 'Setup Monitoring',
      summary: 'Integrate application performance monitoring tools',
      dueDate: '2024-07-25',
    },
    {
      id: 't11',
      userId: 'u4',
      title: 'Refactor Authentication Module',
      summary: 'Improve code structure and add better error handling in auth flow',
      dueDate: '2024-06-18',
    },
    {
      id: 't12',
      userId: 'u6',
      title: 'Research Micro Frontends',
      summary: 'Explore module federation and other micro frontend approaches',
      dueDate: '2024-07-03',
    },
    {
      id: 't13',
      userId: 'u1',
      title: 'Setup GitHub Actions',
      summary: 'Add CI workflow using GitHub Actions for automated tests',
      dueDate: '2024-06-10',
    },
    {
      id: 't14',
      userId: 'u5',
      title: 'Onboard New Developer',
      summary: 'Prepare documentation and onboarding steps for a new team member',
      dueDate: '2024-06-22',
    },
    {
      id: 't15',
      userId: 'u2',
      title: 'Accessibility Audit',
      summary: 'Review and improve accessibility of the main application',
      dueDate: '2024-07-01',
    },
    {
      id: 't16',
      userId: 'u3',
      title: 'Integrate Payment Gateway',
      summary: 'Implement Stripe payment in the checkout workflow',
      dueDate: '2024-07-15',
    },
    {
      id: 't17',
      userId: 'u4',
      title: 'Code Review Guidelines',
      summary: 'Define and document best practices for reviewing PRs',
      dueDate: '2024-06-28',
    },
    {
      id: 't18',
      userId: 'u6',
      title: 'Build Reusable Components',
      summary: 'Extract common UI logic into reusable Angular components',
      dueDate: '2024-08-05',
    },
    {
      id: 't19',
      userId: 'u1',
      title: 'Create Project Roadmap',
      summary: 'Define milestones and release plans for the next 3 months',
      dueDate: '2024-06-30',
    },
    {
      id: 't20',
      userId: 'u2',
      title: 'Optimize Build Pipeline',
      summary: 'Reduce Webpack build time by optimizing config and loaders',
      dueDate: '2024-07-20',
    },
  ]);

  allTasks = this.tasks.asReadonly();

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  getUserTasks(userId: string): Task[] {
    return this.allTasks().filter((task) => { return task.userId === userId; })
  }

  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.update((prevTasks) => [
      {
        id: new Date().getTime().toString(),
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...prevTasks,
    ]);
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks.update((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
