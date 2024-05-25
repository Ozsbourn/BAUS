export const LandingPageResponses = {
	// 200th range
	SuccesfulySaved: {
		code: 200, 
		message: 'Your landing page was succesfully saved!'
	},

	// 400th range
	SomethingWentWrong: {
		code: 400,
		message: 'Something went wrong!',
	},
	Unauthorized: {
		code: 401,
		message: 'You are unathorized!',
	},
	InvalidAuthData: {
		code: 401, 
		message: 'Wrong login or password!',
	},
	NotFound: {
		code: 404, 
		message: 'There isn\'t this landing page!',
	},

	// 500th range
	InternalServerError: {
		code: 500,
		message: 'Internal server error!'
	},
};