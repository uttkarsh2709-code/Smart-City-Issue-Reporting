import api from './api';

export const departmentService = {
  getAllDepartments: async () => {
    const response = await api.get('/departments');
    return response.data;
  },

  getDepartmentById: async (id) => {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  },
};
