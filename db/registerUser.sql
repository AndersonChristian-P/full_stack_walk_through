INSERT INTO user_login (username, password)
VALUES (
    ${username},
    ${hash}
) returning username, password;

-- returning username, password because we want to put them in our session

INSERT INTO users (firstname, lastname, email)
VALUES (
    ${firstname},
    ${lastname},
    ${email}
);

INSERT INTO balances (balance)
VALUES (
    0
) returning balance_id;

-- returning balance_id, because we want to put them in our session