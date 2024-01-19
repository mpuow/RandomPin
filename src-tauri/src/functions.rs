use rusqlite::{Connection, Result};
use rusqlite::Error;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// pub fn greet(name: &str) -> String {
    //     format!("Hello, {}! You've been greeted from Rust!", name)
    // }
    
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Journal {
    title: String,
    content: String,
}

#[tauri::command]
pub fn add_from_frontend(title: &str, content: &str) {
    println!("ADD test");
    let _ = insert_to_sqlite(title, content);
}

#[tauri::command]
pub fn delete_from_frontend() {
    println!("DELETE test");
    let _ = delete_from_sqlite();
}

fn insert_to_sqlite(title: &str, content: &str) -> Result<()> {
    let conn = Connection::open("data.db")?;
    
    let test = Journal {
        title: title.to_string(),
        content: content.to_string(),
    };
    conn.execute(
        "insert into journal (title, content) values (?1, ?2)",
        (&test.title, &test.content)
    )?;

    Ok(())
}

fn delete_from_sqlite() -> Result<()> {
    let conn = Connection::open("data.db")?;

    conn.execute(
        "delete from journal where title == ?1",
        ["Test Title"]
    )?;

    Ok(())
}

#[tauri::command]
pub fn send_data_to_react() -> Vec<Journal> {
    println!("SENDING DATA test");

    let data_vec = Vec::new();
    // data_vec.push("Some string");
    // data_vec.push("eariujghnipeornuhg");

    get_data_from_sqlite(data_vec).unwrap().into()


    // data_vec.into()
}

fn get_data_from_sqlite(mut data_vec: Vec<Journal>) -> Result<Vec<Journal>, Error> {
    let conn = Connection::open("data.db")?;

    let mut stmt = conn.prepare(
        "SELECT * from journal",
    )?;

    let entries = stmt.query_map([], |row| {
        Ok(Journal {
            title: row.get(0)?,
            content: row.get(1)?,
        })
    })?;

    for entry in entries {
        // println!("Found entry {:?}", entry.unwrap().title);
        data_vec.push(entry.unwrap());
    }

    Ok(data_vec)
}
