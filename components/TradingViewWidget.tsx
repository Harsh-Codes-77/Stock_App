'use client';


import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import { cn } from '@/lib/utils';
import React, { memo } from 'react';

interface TradingViewWidgetProps {
    title?: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
}

const TradingViewWidget = ({ title, scriptUrl, config, height = 600, className }: TradingViewWidgetProps) => {
    const containerRef = useTradingViewWidget(scriptUrl, config, height);

    

    return (

        <div className="w-full">
            {title && <h3 className="font-semibold text-2xl text-gray-100 md-5">{title}</h3>}
        <div className="tradingview-widget-container" ref={containerRef} style={{ height: "100%", width: "100%" }}>
            <div className={cn( 'tradingview-widget-container', className)} ref={containerRef}></div>
            <div className="tradingview-widget-container_widget" style={{height, width: "100"}}/>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
