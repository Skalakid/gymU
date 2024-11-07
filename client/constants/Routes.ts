import { Href } from 'expo-router';

const ROUTES = {
  startPage: '/',
  login: '/login',
  signUp: '/sign-up',
  home: '/home',
  calendar: '/calendar',
  workouts: '/workouts',
  explore: '/explore',
  statistics: '/statistics',
} as Record<string, Href>;

export default ROUTES;
