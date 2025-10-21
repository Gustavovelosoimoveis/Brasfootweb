#!/usr/bin/env python3
"""
Script to generate updated team rosters for Brasfoot Web using the OpenAI ChatGPT API.

This script fetches realistic player lists for a predefined set of football teams by
querying the ChatGPT API. The resulting roster is saved into a JavaScript file
(`data.js`) that can be used by the frontend of the game. Running this script
requires an active OpenAI API key.

Usage:
    python update_roster.py --api-key YOUR_OPENAI_API_KEY

The script will overwrite the existing data.js with up-to-date rosters. You can
adjust the list of teams or the number of players generated per team as needed.

Note: This script should be executed in a backend environment to protect your
API key. Do not embed the API key directly into your frontend code.
"""

import argparse
import json
import os
from typing import List, Dict

import openai


def generate_players_for_team(team_name: str, num_players: int = 3) -> List[str]:
    """Use OpenAI's ChatGPT to generate a list of player names for a given team.

    Args:
        team_name (str): The name of the football team.
        num_players (int): Number of player names to generate.

    Returns:
        List[str]: A list of player names.
    """
    system_prompt = (
        "You are a helpful football assistant. Given the name of a football club, "
        "you will produce a list of current professional players for that club. "
        "Only include full names and do not include positions or any other details. "
        "Return exactly {num} names as a JSON array of strings."
    ).format(num=num_players)
    user_prompt = f"Team: {team_name}\nPlayers:"
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # You can change to a different model if desired
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.7,
        max_tokens=150,
    )
    # Parse the response as JSON
    content = completion.choices[0].message["content"].strip()
    try:
        players = json.loads(content)
        if not isinstance(players, list):
            raise ValueError
    except Exception:
        # If parsing fails, fall back to splitting by commas
        players = [p.strip() for p in content.split(",")][:num_players]
    return players


def build_team_roster(team_info: List[Dict[str, str]], api_key: str, players_per_team: int = 3) -> List[Dict[str, object]]:
    """Build a roster for each team using the ChatGPT API.

    Args:
        team_info (List[Dict[str, str]]): A list of dictionaries with team id and name.
        api_key (str): OpenAI API key used to authenticate requests.
        players_per_team (int): Number of players to generate for each team.

    Returns:
        List[Dict[str, object]]: A list of team dictionaries with updated players.
    """
    openai.api_key = api_key
    rosters = []
    for team in team_info:
        print(f"Generating players for {team['name']}…")
        players = generate_players_for_team(team["name"], num_players=players_per_team)
        rosters.append({
            "id": team["id"],
            "name": team["name"],
            "players": players,
        })
    return rosters


def write_data_js(rosters: List[Dict[str, object]], output_path: str) -> None:
    """Write the roster data into a data.js file.

    Args:
        rosters (List[Dict[str, object]]): The team roster data.
        output_path (str): Path to the data.js file to overwrite.
    """
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("const teams = ")
        json.dump(rosters, f, ensure_ascii=False, indent=4)
        f.write(";\n\n")
        f.write("function getRandomTeam() {\n    return teams[Math.floor(Math.random() * teams.length)];\n}\n")
    print(f"Updated roster written to {output_path}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate team rosters using OpenAI ChatGPT and update data.js.")
    parser.add_argument("--api-key", dest="api_key", help="OpenAI API key", required=False)
    parser.add_argument("--players-per-team", dest="players_per_team", type=int, default=3, help="Number of players to generate per team.")
    parser.add_argument("--output", dest="output", default="data.js", help="Output path for the generated data.js file.")
    args = parser.parse_args()

    api_key = args.api_key or os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("An OpenAI API key must be provided via --api-key or OPENAI_API_KEY environment variable")

    # Example list of Brazilian teams; modify as needed
    team_info = [
        {"id": "fla", "name": "Flamengo"},
        {"id": "pal", "name": "Palmeiras"},
        {"id": "bot", "name": "Botafogo"},
        {"id": "flu", "name": "Fluminense"},
        {"id": "cor", "name": "Corinthians"},
        {"id": "sao", "name": "São Paulo"},
        {"id": "int", "name": "Internacional"},
        {"id": "gre", "name": "Grêmio"},
        {"id": "atl", "name": "Atlético-MG"},
        {"id": "cru", "name": "Cruzeiro"},
        {"id": "san", "name": "Santos"},
        {"id": "vas", "name": "Vasco"},
        {"id": "bah", "name": "Bahia"},
        {"id": "for", "name": "Fortaleza"},
        {"id": "ath", "name": "Athletico-PR"},
        {"id": "rbb", "name": "Red Bull Bragantino"},
        {"id": "vit", "name": "Vitória"},
        {"id": "juv", "name": "Juventude"},
        {"id": "cea", "name": "Ceará"},
        {"id": "mir", "name": "Mirassol"},
    ]

    rosters = build_team_roster(team_info, api_key, players_per_team=args.players_per_team)
    write_data_js(rosters, args.output)


if __name__ == "__main__":
    main()