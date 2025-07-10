import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    const newConfig = { ...config };
    if (!newConfig.resolve) newConfig.resolve = {};
    if (!newConfig.resolve.modules) newConfig.resolve.modules = [];
    if (!newConfig.resolve.extensions) newConfig.resolve.extensions = [];
    newConfig.resolve.modules.push(paths.src);
    newConfig.resolve.extensions.push('.ts', '.tsx');

    if (!newConfig.module) newConfig.module = { rules: [] };
    if (!newConfig.module.rules) newConfig.module.rules = [];

    newConfig.module.rules = newConfig.module.rules
        .filter((rule): rule is RuleSetRule => !!rule && typeof rule === 'object')
        .map((rule: RuleSetRule) => {
            if (rule.test && /svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i };
            }
            return rule;
        });

    newConfig.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    newConfig.module.rules.push(buildCssLoader(true));

    return newConfig;
};
