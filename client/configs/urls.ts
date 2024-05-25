const _apiEntryPoint = 'http://localhost:5000/api/';

const _subURIs = {
  auth: _apiEntryPoint + 'auth/',
  groups: _apiEntryPoint + 'groups/',
  pageBuilder: _apiEntryPoint + 'pagebuilder/',
};

export const URLs = {
  // Auth API
  register: _subURIs.auth + 'register',
  login: _subURIs.auth + 'login',
  logout: _subURIs.auth + 'logout',

  // Groups API
  getAll: _subURIs.groups + 'getAll',
  getGroup: _subURIs.groups + 'getGroup/',
  createGroup: _subURIs.groups + 'createGroup',
  deleteGroup: _subURIs.groups + 'deleteGroup/',
  editGroup: _subURIs.groups + 'editGroup/',
  // Permissions
  getUserPermissions: _subURIs.groups + 'getUserPermissions/',
  // Posts
  getAllPosts: _subURIs.groups + 'getAllPosts/',
  savePost: _subURIs.groups + 'savePost/',
  // Invites
  createInvitation: _subURIs.groups + 'createInvitation/',

  // LandingPage's API
  getPage: _subURIs.pageBuilder + 'get',
  savePage: _subURIs.pageBuilder + 'save',
};
