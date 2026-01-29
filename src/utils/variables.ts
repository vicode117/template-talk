/**
 * 从模板内容中提取所有变量名
 * 变量格式: {{variableName}}
 * @param content 模板内容
 * @returns 变量名数组
 */
export function extractVariables(content: string): string[] {
  const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
  const matches = content.matchAll(regex);
  const variables = new Set<string>();

  for (const match of matches) {
    variables.add(match[1]);
  }

  return Array.from(variables);
}

/**
 * 替换模板中的变量
 * @param content 模板内容
 * @param variables 变量映射
 * @returns 替换后的完整话术
 */
export function replaceVariables(content: string, variables: Record<string, string>): string {
  return content.replace(/\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g, (_, name) => {
    return variables[name] ?? '';
  });
}
