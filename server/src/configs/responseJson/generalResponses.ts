export const GeneralResponses = {
	// 200th range
	Success: {
		code: 200,
		message: 'Success!',
	},

	// 400th range
	SomethingWentWrong: {
		code: 400,
		message: 'Something went wrong!',
	},
	BadParameters: {
		code: 400,
		message: 'Passed invalid parameters!',
	},
	Unauthorized: {
		code: 401,
		message: 'You are unathorized!',
	},
	InvalidAuthData: {
		code: 401, 
		message: 'Wrong login or password!',
	},
	InvalidAuthToken: {
		code: 401, 
		message: 'Invalid authorization token!',
	},
	DontHavePermissions: {
		code: 403, 
		message: 'You don\'t have permissions for this action!',
	},

	// 500th range
	InternalServerError: {
		code: 500,
		message: 'Internal server error!'
	},
};