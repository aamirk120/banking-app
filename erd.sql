
CREATE TYPE user_role AS ENUM ('admin', 'merchant', 'user');

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NULL,
    lastName VARCHAR(255) NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isEmailVerified BOOLEAN NOT NULL DEFAULT false,
    role user_role NOT NULL DEFAULT 'user'
);


CREATE TABLE service (
    service_id SERIAL PRIMARY KEY,
    merchant_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (merchant_id) REFERENCES users(user_id)
);


CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    merchant_id INT NOT NULL,
    Date DATE NOT NULL,
    Status booking_status NOT NULL DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES "user" (user_id),
    FOREIGN KEY (merchant_id) REFERENCES "user" (user_id)
);

CREATE TABLE service_booking (
    service_id INT NOT NULL,
    booking_id INT NOT NULL,
    PRIMARY KEY (service_id, booking_id),
    FOREIGN KEY (service_id) REFERENCES service (service_id),
    FOREIGN KEY (booking_id) REFERENCES booking (booking_id)
);

-- receipts Table
CREATE TABLE receipts (
    receipt_id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL,
    payment_details TEXT NOT NULL, 
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

-- reviews Table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL,
    text TEXT,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

