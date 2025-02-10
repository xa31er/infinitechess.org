/*
	* Implementation on fthe glicko rating system.
	*/

function determineNewRD(OldRD, c) {
	const oldRDSquared = Math.pow(OldRD, 2);
	const cSquared = Math.pow(c, 2);

	const newRD = Math.min(Math.sqrt(oldRDSquared + cSquared), 350);

	return newRD;
}
