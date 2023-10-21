const alertReducer = (state = null, action) => {
	switch (action.type) {
		case "ALERT_SUCCESS":
			return action.alert;

		case "ALERT_WARNING":
			return action.alert;

		case "ALERT_DANGER":
			return action.alert;

		case "ALERT_INFO":
			return action.alert;

		case "ALERT_NULL":
			return action.alert;

		default:
			return state;
	}
};

export default alertReducer;
