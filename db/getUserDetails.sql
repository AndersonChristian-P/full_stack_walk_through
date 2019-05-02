SELECT firstname, lastname, email, balance
FROM users
JOIN balances on users.user_id = balances.balance_id
WHERE users.user_id = ${id};

-- we don't use foregin keys because we have sensitive data