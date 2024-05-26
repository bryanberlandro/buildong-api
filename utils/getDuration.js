const getDuration = (start, end) => {
    // Tanggal mulai dan tanggal selesai
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Menghitung durasi dalam milidetik
    const durationInMs = endDate.getTime() - startDate.getTime();

    // Mengonversi durasi dalam milidetik ke dalam durasi bulan dan minggu
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const days = Math.floor(durationInMs / millisecondsInDay);
    const months = Math.floor(days / 30); // Mengasumsikan satu bulan memiliki 30 hari
    const remainingDays = days % 30;
    const weeks = Math.floor(remainingDays / 7);
    const remainingDaysInWeeks = remainingDays % 7;

    // Menampilkan hasil durasi
    let msg = (`${months} bulan ${weeks} minggu ${remainingDaysInWeeks} hari`);
    return msg;
}

export default getDuration;