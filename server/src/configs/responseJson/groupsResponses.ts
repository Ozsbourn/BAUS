export const GroupsResponses = {
	// 200th range
	SuccesfullyCreated: {
		code: 200,
		message: 'Group was succesfully created!',
	},
	SuccesfullyDeleted: {
		code: 200,
		message: 'Group was succesfully deleted!',
	},
	SuccesfullyModified: {
		code: 200,
		message: 'Group was succesfully modified!',
	},
	InviteWasSent: {
		code: 200,
		message: 'Invite was sent to specified url!',
	},

	// 400th range
	GroupDoesntExist: {
		code: 404,
		message: 'There isn\'t this group!',
	},
	GroupsDoesntExist: {
		code: 404,
		message: 'You don\'t have any groups!',
	},
};