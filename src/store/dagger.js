import { create } from "zustand";

export const useDaggerStore = create((set) => ({
	daggers: [],
	setDaggers: (daggers) => set({ daggers }),
	createDagger: async (newDagger) => {
		if (!newDagger.loanAmount || !newDagger.loanTermYears || !newDagger.annualInterestRate) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("https://mern-backend-wknc.onrender.com/api/daggers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newDagger),
		});
		console.log("res", res)
		const data = await res.json();
		console.log("data", data)
		set((state) => ({ daggers: [...state.daggers, data.data] }));
		return { success: true, message: "Dagger created successfully" };
	},
	fetchDaggers: async () => {
		const res = await fetch("https://mern-backend-wknc.onrender.com/api/daggers");
		const data = await res.json();
		console.log(res)
		    data.data.sort((a, b) => a.monthlyPI - b.monthlyPI);

    // Log sorted result
    console.log("sorted", data.data);
		set({ daggers: data.data });
	},
	deleteDagger: async (pid) => {
		const res = await fetch(`https://mern-backend-wknc.onrender.com/api/daggers/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ daggers: state.daggers.filter((dagger) => dagger._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateDagger: async (pid, updatedDagger) => {
		const res = await fetch(`https://mern-backend-wknc.onrender.com/api/daggers/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedDagger),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			daggers: state.daggers.map((dagger) => (dagger._id === pid ? data.data : dagger)),
		}));

		return { success: true, message: data.message };
	},
}));