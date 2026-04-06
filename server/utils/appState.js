/**
 * AppState is a simple in-memory store for the current session.
 * For a production app, this would use a database or session-cookies.
 * For our local Maestro project, this acts as the "Server Memory".
 */

class AppState {
  constructor() {
    this.session = {
      isConnected: false,
      user: null,
      lastActive: null,
      job: null,
    };
  }

  setSession(userData) {
    this.session = {
      isConnected: true,
      user: userData,
      lastActive: new Date().toISOString()
    };
  }

  getSession() {
    return this.session;
  }

  setJob(jobData) {
    this.session.job = jobData;
  }

  getJob() {
    return this.session.job || null;
  }

  clearJob() {
    this.session.job = null;
  }

  clearSession() {
    this.session = {
      isConnected: false,
      user: null,
      lastActive: null,
      job: null,
    };
  }
}

export const appState = new AppState();
