import { create } from "zustand";
import { axiosInstance } from "../lib/axios.config";

export const useContactStore = create((set) => ({
  contacts: [],
  selectedContact: {},
  meta: {},
  isContactsLoading: false,

  setSelectedContact: (data) => {
    set({ selectedContact: data });
  },

  getContacts: async (params) => {
    const jsonString = JSON.stringify(params);
    const encodedJson = encodeURIComponent(jsonString);
    const url = `contact/get?data=${encodedJson}`;

    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get(url);
      if (res.data.success) {
        set({ meta: res.data.meta });
        set({ contacts: res.data.data });
      } else {
        console.log(res.data.message);
      }
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      return { success: false, message: error.response.data.message };
    } finally {
      set({ isContactsLoading: false });
    }
  },

  createContact: async (data) => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.post("/contact/create", data);
      if (res.data.success) {
        set((state) => ({
          contacts: [res.data.data, ...state.contacts],
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
      set({ isContactsLoading: false });
    }
  },

  updateContact: async (data) => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.put(
        `/contact/update/?contactId=${data.contactId}&status=${data.status}`,
      );
      if (res.data.success) {
        set((state) => ({
          contacts: state.contacts.map((app) =>
            app._id === data.contactId ? { ...app, status: data.status } : app,
          ),
        }));
        console.log(res.data.message);
      } else {
        console.log(res.data.message);
      }
      return res.data;
    } catch (error) {
      console.log("Error updating Contact.");
      return { success: false, message: error.response.data.message };
    } finally {
      set({ isContactsLoading: false });
    }
  },
}));
