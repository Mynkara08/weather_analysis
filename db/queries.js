const pool = require("./config");

const findByTimestamp = async (timestamp, city) => {
  const query = "SELECT * FROM weather WHERE timestamp = $1 AND city = $2";
  const result = await pool.query(query, [timestamp, city]);
  return result.rows.length ? result.rows[0] : null;
};

const findMinMaxAvgtemperatureByTimestamp = async (timestamp, city) => {
  const query =
    "SELECT MIN(temperature), MAX(temperature), AVG(temperature) FROM weather WHERE timestamp >= $1 AND city = $2";
  const result = await pool.query(query, [timestamp, city]);
  return result.rows[0];
};

const saveOrUpdate = async (weather) => {
  const existingWeather = await findByTimestamp(weather.timestamp);

  if (existingWeather) {
    const query =
      "UPDATE weather SET description = $1, temperature = $2, type = $3, city=$4 WHERE timestamp = $5 RETURNING *";
    const result = await pool.query(query, [
      weather.description,
      weather.temp,
      weather.type,
      weather.name,
      weather.timestamp,
    ]);
    return result.rows[0];
  } else {
    const query =
      "INSERT INTO weather (description, temperature, timestamp, type, city) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await pool.query(query, [
      weather.description,
      weather.temp,
      weather.timestamp,
      weather.type,
      weather.name,
    ]);
    return result.rows[0];
  }
};

const getTemperatureStatsInDateRange = async (startDate, endDate, city) =>{
    const query =  `
    SELECT
        to_char(to_timestamp(timestamp), 'YYYY-MM-DD') AS day,
        MIN(temperature) AS min_temperature,
        MAX(temperature) AS max_temperature,
        AVG(temperature) AS avg_temperature
    FROM
        weather
    WHERE
        timestamp >= $1
        AND timestamp <= $2
        AND city = $3
    GROUP BY
        day
    ORDER BY
        day;
`;

    try {
        const values = [startDate, endDate, city];
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error("Error fetching temperature data:", error);
        throw error;
    }
}

module.exports = {
  findMinMaxAvgtemperatureByTimestamp,
  saveOrUpdate,
  getTemperatureStatsInDateRange,
};
