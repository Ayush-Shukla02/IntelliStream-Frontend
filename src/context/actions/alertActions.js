export const alertSuccess = (message) => {
	return {
		type: "ALERT_SUCCESS",
		alert: { type: "success", message: message },
	};
};

export const alertWarning = (message) => {
	return {
		type: "ALERT_WARNING",
		alert: { type: "warning", message: message },
	};
};

export const alertDanger = (message) => {
	return {
		type: "ALERT_DANGER",
		alert: { type: "danger", message: message },
	};
};

export const alertInfo = (message) => {
	return {
		type: "ALERT_INFO",
		alert: { type: "info", message: message },
	};
};

export const alertNull = () => {
	return {
		type: "ALERT_NULL",
		alert: null,
	};
};
