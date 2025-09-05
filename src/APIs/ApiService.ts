export const registerUser = async (userData: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    console.log('Sending registration request with data:', userData);

    const formData = new FormData();
    formData.append('name', userData.fullName);
    formData.append('email', userData.email);
    formData.append('mobile', userData.phone);
    formData.append('password', userData.password);

    const response = await fetch('https://medartis-app.thebetaspace.com/api/v1/register', {
      method: 'POST',
      headers: {
        'app-key': 'yrWN6aKdDdTeTTSwdyXw2L8UOmfc5rxP', // API Key
      },
      body: formData,
    });

    const data = await response.json();
    console.log('Registration API response:', data);
    return data;
  } catch (error) {
    console.error('Registration API error:', error);
    throw error;
  }
};

//Login apiService.ts

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    console.log('Sending login request with credentials:', credentials);

    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await fetch('https://medartis-app.thebetaspace.com/api/v1/login', {
      method: 'POST',
      headers: {
        'app-key': 'yrWN6aKdDdTeTTSwdyXw2L8UOmfc5rxP', // Include this if required by the API
      },
      body: formData,
    });

    const data = await response.json();
    console.log('Login API response:', data);
    return data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};
