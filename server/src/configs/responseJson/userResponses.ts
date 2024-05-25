export const UserResponseJson = {
	// 200th range
	loginSuccess: {
		code: 200,
		message: 'You succesfully logged in!',
	},
	logoutSuccess: {
		code: 200,
		message: 'You succesfully logged out!',
	},

	// 400th range
	userDontExist: {
		code: 404,
		message: 'There isn\'t this user!',
	},
	UserExist: {
		code: 400,
		message: 'User with same email or login already exist. Try another one!',
	},
};