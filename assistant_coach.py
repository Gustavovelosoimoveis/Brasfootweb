#!/usr/bin/env python3
"""
Script para obter sugestões de escalação usando a API da OpenAI.

Este script consulta o ChatGPT para gerar uma escalação inicial ideal para um time de futebol.
Ele pode ser utilizado como um suporte técnico para o jogo, fornecendo uma lista de jogadores
recomendados para iniciar uma partida. O script salva a sugestão em formato JSON para
consumo pelo frontend ou para análise manual.

Uso:
    python assistant_coach.py --team "Flamengo" --api-key SUA_API_KEY --output lineup_fluminense.json

Requer:
    - A biblioteca `openai` instalada (`pip install openai`).
    - Uma chave de API válida da OpenAI.
"""

import argparse
import json
import os

import openai


def get_lineup(team_name: str, num_players: int = 11) -> list:
    """Consulta o ChatGPT para obter uma escalação sugerida de jogadores.

    Args:
        team_name (str): Nome do clube.
        num_players (int): Número de jogadores na escalação (padrão: 11).

    Returns:
        list: Lista de jogadores como strings.
    """
    system_prompt = (
        "Você é um especialista em futebol. Para o time fornecido, "
        "gere uma lista de {num} jogadores titulares atuais. "
        "Inclua apenas os nomes completos e não acrescente posições, números ou "
        "quaisquer outras informações. Responda com um array JSON simples de strings.".format(num=num_players)
    )
    user_prompt = f"Time: {team_name}\nEscalação:"
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.7,
        max_tokens=200,
    )
    content = completion.choices[0].message["content"].strip()
    try:
        players = json.loads(content)
        if not isinstance(players, list):
            raise ValueError
    except Exception:
        # Se falhar o parsing, faz um split básico
        players = [p.strip() for p in content.split(",")][:num_players]
    return players


def main() -> None:
    parser = argparse.ArgumentParser(description="Gerar escalação ideal para um time usando ChatGPT.")
    parser.add_argument("--team", dest="team", required=True, help="Nome do time para o qual gerar a escalação.")
    parser.add_argument("--api-key", dest="api_key", required=False, help="Chave da API da OpenAI.")
    parser.add_argument("--output", dest="output", default="lineup.json", help="Arquivo de saída para a sugestão de escalação.")
    parser.add_argument("--players", dest="players", type=int, default=11, help="Número de jogadores na escalação.")
    args = parser.parse_args()

    api_key = args.api_key or os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("É necessário fornecer uma chave de API da OpenAI via --api-key ou variável de ambiente OPENAI_API_KEY.")

    openai.api_key = api_key
    lineup = get_lineup(args.team, num_players=args.players)
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump({"team": args.team, "lineup": lineup}, f, ensure_ascii=False, indent=4)
    print(f"Sugestão de escalação para {args.team} salva em {args.output}")


if __name__ == "__main__":
    main()