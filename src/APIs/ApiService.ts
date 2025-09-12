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


// Forgot Password API
export const forgotPassword = async (email: string) => {
  try {
    console.log('Sending forgot password request with email:', email);

    const formData = new FormData();
    formData.append('email', email);

    const response = await fetch('https://medartis-app.thebetaspace.com/api/v1/forgot-pass-code', {
      method: 'POST',
      headers: {
        'app-key': 'yrWN6aKdDdTeTTSwdyXw2L8UOmfc5rxP', // API Key
      },
      body: formData,
    });

    const data = await response.json();
    console.log('Forgot Password API response:', data);
    return data;
  } catch (error) {
    console.error('Forgot Password API error:', error);
    throw error;
  }
};

// Send Forgot Password API with email and auth_code
export const verifyOtp = async (email: string, authCode: string) => {
  try {
    console.log('Sending forgot password request with email and auth_code:', email, authCode);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('auth_code', authCode);  // Include the auth code

    const response = await fetch('https://medartis-app.thebetaspace.com/api/v1/forgot-pass', {
      method: 'POST',
      headers: {
        'app-key': 'yrWN6aKdDdTeTTSwdyXw2L8UOmfc5rxP', // API Key
      },
      body: formData,
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    // Parse the response body as JSON
    const data = await response.json();
    console.log('Forgot Password API response:', data);
    return data;
  } catch (error) {
    console.error('Forgot Password API error:', error);
    throw error; // Re-throwing the error for the caller to handle
  }
};

// Reset Password API
export const resetPassword = async ({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('new-pass', newPassword); // key must match API exactly

    const response = await fetch('https://medartis-app.thebetaspace.com/api/v1/update-forgot-pass', {
      method: 'POST',
      headers: {
        'app-key': 'yrWN6aKdDdTeTTSwdyXw2L8UOmfc5rxP', // ✅ Add your API key here
      },
      body: formData,
    });

    const data = await response.json();
    console.log('Reset Password API response:', data);
    return data;
  } catch (error) {
    console.error('Reset Password API error:', error);
    throw error;
  }
};


// Get Videos API
export const getVideos = async () => {
  try {
    console.log('Fetching video list...');

    const response = await fetch('https://medartis-app.thebetaspace.com/api/v1/list-videos', {
      method: 'GET',
      headers: {
        'app-key': 'yrWN6aKdDdTeTTSwdyXw2L8UOmfc5rxP', // API Key
      },
    });

    const data = await response.json();
    console.log('Get Videos API response:', data);

    return data?.files || [];
  } catch (error) {
    console.error('Get Videos API error:', error);
    throw error;
  }
};

// Fetch Account Details API
export const fetchAccountDetails = async (username: string) => {
  try {
    const formData = new FormData();
    formData.append('username', username);

    const response = await fetch('https://medartis-app.thebetaspace.com/api/v1/account', {
      method: 'POST',
      headers: {
        'app-key': 'yrWN6aKdDdTeTTSwdyXw2L8UOmfc5rxP',
      },
      body: formData,
    });

    const data = await response.json();
    console.log('Account Details API response:', data);
    return data?.user || null;
  } catch (error) {
    console.error('Account Details API error:', error);
    throw error;
  }
};
// // Fetch Video by ID API
// export const getVideoById = async (videoId: number) => {
//   try {
//     const response = await fetch(`https://your-api-url.com/api/videos/${videoId}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch video');
//     }
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
