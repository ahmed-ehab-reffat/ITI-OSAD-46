

## Functions vs. Procedures

* **Function:** Returns exactly *one* value.
* **Procedure:** Performs an action or executes a small script. It can return columns or a full table.
    * We **do not** use the `RETURN` keyword in procedures.
    * Created using parameters: `CREATE PROCEDURE p_name (IN x, OUT y, INOUT z)`
    * You can use `INSERT` statements inside a Procedure.
    * **Calling Restrictions:** You cannot call a procedure inside a `WHERE` clause. It must be called independently:
        ```sql
        CALL Procedure1(...);
        ```

* **Variables:** `SET @id` creates a **Session Variable**.

---

## Triggers

A **trigger** is an action taken automatically at a certain event.

* **Syntax Structure:**
    ```sql
    CREATE TRIGGER t_name 
    {BEFORE | AFTER} {EVENT (DML: INSERT, UPDATE, DELETE)} 
    ON table_name
    ```
* **Logic:** You create the trigger logic to execute for *each record* statement.
    * *Note:* In PostgreSQL, you can use the `INSTEAD OF` keyword (useful for views), and you can assign multiple events to a single trigger.
* **Data References:**
    * `NEW`: Refers to the incoming record (used in `INSERT` and `UPDATE`).
    * `OLD`: Refers to the previous record (used in `DELETE` and `UPDATE`).
* **Common Error:** Trying to update the same row that fired the trigger when using the `AFTER` keyword.
* *Side Note/Question from notes:* `uuid??` (Universally Unique Identifier, often generated via triggers or default values to ensure primary key uniqueness).

### Custom Errors

You can intentionally throw errors in SQL scripts or triggers using:
```sql
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Your custom error message';
```

Transactions & Concurrency Control

Concurrency Control: Treating a number of SQL queries as a single block to validate all operations at once.

ACID Properties

• Atomicity: Treating a number of operations as one block (one unit!).

• Analogy: Like a try...catch block in backend development.

• We either COMMIT the data (save it) or ROLLBACK (revert it if something fails).

• Consistency: Constraints and rules are preserved throughout the transaction.

• Isolation: Solves the problem of more than one user accessing the same data simultaneously. (Handled at the DB level).

• Durability: Guarantees that all processes are permanently saved in the real database (hard disk) after committing.

• Flow: App -> RAM -> COMMIT -> DB (Hard Disk)

• Side Note: If the system crashes before committing, databases use mechanisms like WAL (Write-Ahead Logging) to recover.

Isolation Problems (Read Phenomena)

Depending on your database design, allowing many users to read/write data at the same time can cause issues:

• Dirty Read: T1 reads data that is later rolled back by T2. (T1 read invalid data).

• Non-repeatable Read: T1 reads the same data multiple times. In between those reads, T2 updates the data, resulting in T1 getting different results for the exact same query.

• Phantom Read: T1 misses data or sees new "phantom" records because T2 is committing inserts/deletes in the background.

• Lost Update: T2 overwrites the updates made by T1.

Solution: Database Isolation solves all of these!

Isolation Levels

Trade-off rule: Increasing the isolation level will reduce DB performance but will make data more consistent. (e.g., Banks need high consistency, while Social Media feeds require less consistency but higher performance).

Session Commands:
```sql
SELECT @@transaction_isolation;
SET SESSION TRANSACTION ISOLATION LEVEL <level>;
START TRANSACTION;
-- SQL operations here
COMMIT;
```

The 4 Levels (MySQL)

• Read Uncommitted (0% Isolation):

• Suffers from Dirty Reads.

• Read Committed:

• Fixes: Dirty Reads. You only read what has been officially committed.

• Example: T1 reads x=5. T2 writes x=7 but hasn't committed. T1 will still read x=5 until T2 commits.

• Repeatable Read:

• Fixes: Non-repeatable reads.

• Example: T1 takes a "snapshot" of the DB. Even if T2 writes x=7 and commits, T1 will continuously read x=5 until T1 itself makes a commit.

• Serializable (Highest Isolation):

• The DB forces all transactions to run in sequence (T1 -> T2 -> T3).

• Example: T1 writes to x (acquires an exclusive lock). If T2 tries to read x, it will not read anything and will wait (or time out) until T1 finishes.

Deadlocks & Locking

A Deadlock occurs when two transactions block each other indefinitely.

• Example: T1 locks x and waits for y. T2 locks y and waits for x.

• Pessimistic Locking (متشائم): Assumes conflicts will happen.

• To solve a deadlock, the DB chooses a Victim transaction to terminate.

• It may choose the transaction blocking the most others, or simply the last one that started.

• The victim will be rolled back and rescheduled.

• Starvation: Occurs when the same transaction is repeatedly chosen as the victim.

• Optimistic Locking (متفائل): Assumes conflicts are rare.

• Checks for conflicts only right before committing, blocking deadlocks before they fully execute.

Side Knowledge (User Permissions):

Keep in mind that when updating, changes are not made directly on the DB until you COMMIT. Also, managing who can do what is done via user grants

```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON database.table TO 'username';
REVOKE SELECT ON database.table FROM 'username';
``
