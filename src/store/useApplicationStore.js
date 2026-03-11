import { create } from "zustand";
import { axiosInstance } from "../lib/axios.config";

export const useApplicationStore = create((set) => ({
  applications: [],
  selectedApplication: {},
  meta: {},
  isApplicationsLoading: false,

  setSelectedApplication: (data) => {
    set({ selectedApplication: data });
  },

  getApplications: async (params) => {
    const jsonString = JSON.stringify(params);
    const encodedJson = encodeURIComponent(jsonString);
    const url = `application/get?data=${encodedJson}`;

    set({ isApplicationsLoading: true });
    try {
      const res = await axiosInstance.get(url);
      if (res.data.success) {
        set({ meta: res.data.meta });
        set({ applications: res.data.data });
      } else {
        console.error(res.data.message);
      }
      return res.data;
    } catch (error) {
      console.error(error.response.data.message);
      return { success: false, message: error.response.data.message };
    } finally {
      set({ isApplicationsLoading: false });
    }
  },

  createApplication: async (data) => {
    set({ isApplicationsLoading: true });
    try {
      const res = await axiosInstance.post("/application/create", data);
      if (res.data.success) {
        set((state) => ({
          applications: [res.data.data, ...state.applications],
        }));
        console.log(res.data.message);
      } else {
        console.log(res.data.message);
      }
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      return { success: false, message: error.response.data.message };
    } finally {
      set({ isApplicationsLoading: false });
    }
  },

  updateApplication: async (data) => {
    set({ isApplicationsLoading: true });
    try {
      const res = await axiosInstance.put(
        `/application/update/?applicationId=${data.applicationId}&status=${data.status}`,
      );
      if (res.data.success) {
        set((state) => ({
          applications: state.applications.map((app) =>
            app._id === data.applicationId
              ? { ...app, status: data.status }
              : app,
          ),
        }));
        console.log(res.data.message);
      } else {
        console.log(res.data.message);
      }
      return res.data;
    } catch (error) {
      console.log("Error updating Lead.");
      return { success: false, message: error.response.data.message };
    } finally {
      set({ isApplicationsLoading: false });
    }
  },
}));
