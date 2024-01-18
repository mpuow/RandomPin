// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{Connection, Result};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn test() {
    println!("Invoke test");
    insert_to_sqlite();
}

fn insert_to_sqlite() -> Result<()> {
    let conn = Connection::open("data.db")?;
    
    let test = Journal {
        title: "Test Title".to_string(),
        content: "Test Content. This should be a lot longer than the title, idk what limit to put on yet".to_string(),
    };
    conn.execute(
        "insert into journal (title, content) values (?1, ?2)",
        (&test.title, &test.content)
    )?;

    Ok(())
}

#[derive(Debug)]
struct Journal {
    title: String,
    content: String,
}

fn main() -> Result<()> {
    let conn = Connection::open("data.db")?;

    conn.execute(
        "create table if not exists journal (
             title text not null,
             content text not null
         )",
        (),
    )?;

    // let test = Journal {
    //     title: "Test Title".to_string(),
    //     content: "Test Content. This should be a lot longer than the title, idk what limit to put on yet".to_string(),
    // };
    // conn.execute(
    //     "insert into journal (title, content) values (?1, ?2)",
    //     (&test.title, &test.content)
    // )?;

    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![greet, test])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
