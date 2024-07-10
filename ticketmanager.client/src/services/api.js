const API_BASE_URL = 'https://localhost:7241';

const getHeaders = () => {
  const token = sessionStorage.getItem('token'); 
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
      const errorData = await response.json();
      if (errorData.errors) {
          throw new Error(Object.values(errorData.errors).join(' '));
      }
      throw new Error('Failed to register');
  }

  const data = await response.json();
  return data;
};

// Auth
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
      throw new Error('Invalid email or password.');
  }

  const data = await response.json();
  console.log('Login response:', data);
  return data;
};

export const register = async (email, password, firstName, lastName) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password, firstName, lastName }),
  });
  return handleResponse(response);
};

// Tickets

export const getAllTickets = async () => {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'GET',
      headers: getHeaders(),
  });
  return handleResponse(response);
};

export const getUserTickets = async () => {
  const response = await fetch(`${API_BASE_URL}/tickets/my`, {
      method: 'GET',
      headers: getHeaders(),
  });
  return handleResponse(response);
};

export const createTicket = async (title, description, type) => {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ title, description, type }),
  });
  return handleResponse(response);
};

export const getTicketDetails = async (ticketId) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/details`, {
      method: 'GET',
      headers: getHeaders(),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch ticket details');
  }

  const data = await response.json();
  console.log('API - getTicketDetails response:', data);
  return data;
};

export const createComment = async (ticketId, text) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/comments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ text }),
  });
  return handleResponse(response);
};

export const assignToUser = async (ticketId) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/assign`, {
      method: 'PUT',
      headers: getHeaders(),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to assign ticket');
  }

  const data = await response.json();
  console.log('API - assignToUser response:', data);
  return data;
};

export const updateTicketStatus = async (ticketId, status) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
  });

  return handleResponse(response);
};

export const updateTicketPriority = async (ticketId, priority) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/priority`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ priority }),
  });

  return handleResponse(response);
};

export const getAssignedTickets = async () => {
  const response = await fetch(`${API_BASE_URL}/tickets/assigned`, {
      method: 'GET',
      headers: getHeaders(),
  });
  return handleResponse(response);
};

// Users

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch users');
  }

  const data = await response.json();
  return data;
};

export const getUserDetails = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user details');
  }

  const data = await response.json();
  console.log('API - getUserDetails response:', data); 
  return data;
};

