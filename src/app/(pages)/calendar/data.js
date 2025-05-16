// events={[
//   {
//     id: 1,
//     start: new Date('2024-11-10T04:00:00.000Z'),
//     end: new Date('2024-11-11T04:00:00.000Z'),
//     title: 'Long Event'
//   },
//   {
//     id: 2,
//     start: new Date('2024-11-14T04:00:00.000Z'),
//     end: new Date('2024-11-14T08:30:00.000Z'),
//     title: 'DST starts on this day (EST)'
//   }
// ]}

export const myevents = [
	{
		id: 0,
		title: "training",
		start: new Date(2024, 10, 18, 9, 0, 0),
		end: new Date(2024, 10, 18, 13, 0, 0),
		resourceId: 1
	},
	{
		id: 1,
		title: "late lunch",
		start: new Date(2024, 10, 18, 14, 0, 0),
		end: new Date(2024, 10, 18, 16, 30, 0),
		resourceId: 2
	},
	{
		id: 2,
		title: "fight",
		// start: new Date(2024, 10, 18, 8, 30, 0),
		// end: new Date(2024, 10, 18, 12, 30, 0),
		// start: new Date('2024-11-18T08:30:00-05:00'),
		// end: new Date('2024-11-18T12:30:00-05:00'),
		start: new Date('2024-11-18T08:30:00Z'),
		end: new Date('2024-11-18T12:30:00Z'),
		resourceId: 3
	},
	{
		id: 3,
		title: "party",
		start: new Date(2024, 10, 18, 7, 0, 0),
		end: new Date(2024, 10, 18, 10, 30, 0),
		resourceId: 4
	}
];

export const myresources = [
	{ id: 1, title: "spiderman" },
	{ id: 2, title: "batman" },
	{ id: 3, title: "aquaman" },
	{ id: 4, title: "microman" }
];
