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

  console.log('Login successful');

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
  
  console.log('Ticket created successfully');

  return handleResponse(response);
};

export const  getTicketDetails = async (ticketId) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/details`, {
      method: 'GET',
      headers: getHeaders(),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch ticket details');
  }

  const data = await response.json();
  return data;
};

export const createComment = async (ticketId, text) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/comments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ text }),
  });
  
  console.log('Comment created successfully');

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
  console.log('Ticket assigned successfully');
  return data;
};

export const updateTicketStatus = async (ticketId, status) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
  });

  console.log('Ticket status updated successfully');

  return handleResponse(response);
};

export const updateTicketPriority = async (ticketId, priority) => {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/priority`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ priority }),
  });

  console.log('Ticket priority updated successfully');

  return handleResponse(response);
};

export const getAssignedTickets = async () => {
  const response = await fetch(`${API_BASE_URL}/tickets/assigned`, {
      method: 'GET',
      headers: getHeaders(),
  });

  if (!response.ok) {
      if (response.status === 404) {
          return [];
      } else {
          throw new Error('Failed to fetch assigned tickets');
      }
  }

  return handleResponse(response);
};

// Users
export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
          ...getHeaders(),
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create user');
  }

  console.log('User created successfully');

  return await response.json();
};

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
  return data;
};

export const updateUser = async (userId, role) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
          ...getHeaders(),
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user');
  }

  console.log('User updated successfully');

  return await response.json();
};