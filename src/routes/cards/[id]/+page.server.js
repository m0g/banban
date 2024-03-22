import prisma from '$lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import { redirect, fail } from '@sveltejs/kit';
import sharp from 'sharp';

export const load = async ({ params: { id } }) => {
  const card = await prisma.card.findUnique({
    where: { id },
    include: {
      board: true,
      list: true,
      attachments: true,
      actions: {
        orderBy: { date: 'desc' },
        include: { user: true }
      }
    }
  });

  const board = await prisma.board.findUnique({
    where: { id: card.board.id },
    include: {
      lists: {
        orderBy: { pos: 'asc' },
        include: {
          cards: {
            orderBy: { pos: 'asc' },
            include: { attachments: true }
          }
        }
      }
    }
  });

  return { board, card };
};
