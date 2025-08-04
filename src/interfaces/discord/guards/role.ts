import { GuildMember } from 'discord.js';

export function hasRole(member: GuildMember, roleId: string): boolean {
  return member.roles.cache.has(roleId);
}

export function requireRole(member: GuildMember, roleId: string): void {
  if (!hasRole(member, roleId)) {
    throw new Error(`Missing required role: ${roleId}`);
  }
}
