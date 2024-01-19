// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod functions;
use functions::add_from_frontend;
use functions::delete_from_frontend;
use functions::send_data_to_react;
use rusqlite::{Connection, Result};


fn main() -> Result<()> {
    let conn = Connection::open("data.db")?;

    conn.execute(
        "create table if not exists journal (
             title text not null,
             content text not null,
             date text not null
         )",
        (),
    )?;

    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![add_from_frontend, delete_from_frontend, send_data_to_react])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}